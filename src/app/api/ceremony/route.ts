import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { stat, mkdir, writeFile } from "fs/promises";
import { unlinkSync } from "fs";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { join } from "path";
import { authOptions } from "src/components/lib/auth";
import mime from "mime";
import { persianToFinglish } from "@/utils/prTOen";
import Ceremony from "@/models/cermony";

export async function POST(req: Request) {
    try {
        await connectDB();
        
        const formData = await req.formData();
        const title = formData.get("title") as string || null;
        const description = formData.get("description") as string || null;
        const date = formData.get("date") as string || null;
        const coverImage = formData.get("coverImage") as File || null;
        const images = formData.getAll("images") as File[] || []; // تغییر این خط برای دریافت کلید صحیح

        let coverImageName; 
        let fileNames: string[] = [];

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        const user = await USER.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        if (!title || !description || !date || !coverImage || !images) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status: 422 }
            );
        }

        const enTitle = persianToFinglish(title);
        const safeTitle = enTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase(); 
        const relativeUploadDir = `/uploads/images/cermony/${safeTitle}`; 
        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        // آپلود کاور تصویر
        if (coverImage) {
            const mimeType = coverImage.type;
            const buffer = Buffer.from(await coverImage.arrayBuffer());

            try {
                await stat(uploadDir);
            } catch (e: any) {
                if (e.code === "ENOENT") {
                    await mkdir(uploadDir, { recursive: true });
                } else {
                    console.error("Error creating directory:", e);
                    return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
                }
            }

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            let extension = mime.getExtension(mimeType);

            const currentDate = new Date().toISOString().slice(0, 10);
            coverImageName = `${currentDate}$${coverImage.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;

            await writeFile(`${uploadDir}/${coverImageName}`, buffer);
        }

        // آپلود تصاویر
        for (const image of images) {
            const mimeType = image.type;
            const buffer = Buffer.from(await image.arrayBuffer());

            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const fileName = `${uniqueSuffix}.${extension}`;

            await writeFile(`${uploadDir}/${fileName}`, buffer);
            fileNames.push(fileName);
        }

        // ذخیره اطلاعات مراسم
        const newCermony = await Ceremony.create({
            title,
            date,
            description,
            coverImage: coverImageName,
            images: fileNames,
        });

        return NextResponse.json(
            { message: MESSAGE.NEW_CERMONY },
            { status: 201 }
        );

    } catch (err) {
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}