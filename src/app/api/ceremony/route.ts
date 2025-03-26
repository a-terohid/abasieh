import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import fs from "fs";
import path, { join } from "path";
import { mkdir, writeFile, stat, readdir, unlink, rename } from "fs/promises";
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
        const images = formData.getAll("images") as File[] || [];

        let coverImageName: string | undefined;
        let fileNames: string[] = [];

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        const user = await USER.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });
        }

        if (!title || !description || !date || !coverImage || !images) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 422 });
        }

        const enTitle = persianToFinglish(title);
        const safeTitle = enTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const coverDir = `/uploads/images/cermony/${safeTitle}/cover`;
        const coverUploadDir = join(process.cwd(), "public", coverDir);
        const imageDir = `/uploads/images/cermony/${safeTitle}`;
        const imageUploadDir = join(process.cwd(), "public", imageDir);

        // Create directories if they don't exist
        try {
            await stat(coverUploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(coverUploadDir, { recursive: true });
            } else {
                console.error("Error creating directory:", e);
                return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
            }
        }

        try {
            await stat(imageUploadDir);
        } catch (e: any) {
            if (e.code === "ENOENT") {
                await mkdir(imageUploadDir, { recursive: true });
            } else {
                console.error("Error creating directory:", e);
                return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
            }
        }

        // Upload cover image
        if (coverImage) {
            const mimeType = coverImage.type;
            const buffer = Buffer.from(await coverImage.arrayBuffer());
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const currentDate = new Date().toISOString().slice(0, 10);
            coverImageName = `${currentDate}$${coverImage.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;

            await writeFile(join(coverUploadDir, coverImageName), buffer);
        }

        // Upload ceremony images
        for (const image of images) {
            const mimeType = image.type;
            const buffer = Buffer.from(await image.arrayBuffer());
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const fileName = `${uniqueSuffix}.${extension}`;

            await writeFile(join(imageUploadDir, fileName), buffer);
            fileNames.push(fileName);
        }

        // Save ceremony information
        const newCermony = await Ceremony.create({
            title,
            date,
            description,
            coverImage: coverImageName,
            images: fileNames,
        });

        return NextResponse.json({ message: MESSAGE.NEW_CERMONY }, { status: 201 });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const formData = await req.formData();
        const title = formData.get("title") as string || null;
        const description = formData.get("description") as string || null;
        const date = formData.get("date") as string || null;
        const coverImage = formData.get("coverImage") as File || null;
        const images = formData.getAll("images") as File[] || [];
        const id = formData.get("id") as string || null;
        const isCheckedCoverImage = formData.get("isCheckedCoverImage") as string || null;
        const deletedImages = formData.getAll("deletedImages") as string[] || [];

        let coverImageName: string | undefined;
        let imageFileNames: string[] = [];

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        const user = await USER.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });
        }

        if (!title || !description || !date) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 422 });
        }

        const ceremony = await Ceremony.findOne({ _id: id });
        if (!ceremony) {
            return NextResponse.json({ error: ERROR.CANT_FIND_CEREMONY }, { status: 404 });
        }

        const enTitle = persianToFinglish(ceremony.title);
        const safeTitle = enTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const coverDir = `/uploads/images/cermony/${safeTitle}/cover`;
        const coverUploadDir = join(process.cwd(), "public", coverDir);
        const imageDir = `/uploads/images/cermony/${safeTitle}`;
        const imageUploadDir = join(process.cwd(), "public", imageDir);

        // Upload cover image
        if (coverImage && isCheckedCoverImage === "true") {
            // Delete previous cover image
            if (ceremony.coverImage) {
                const coverImagePath = join(coverUploadDir, ceremony.coverImage);
                if (fs.existsSync(coverImagePath)) {
                    fs.unlinkSync(coverImagePath);
                }
            }

            const mimeType = coverImage.type;
            const buffer = Buffer.from(await coverImage.arrayBuffer());
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            coverImageName = `${uniqueSuffix}.${extension}`;

            await writeFile(join(coverUploadDir, coverImageName), buffer);
        }

        // Upload new images
        for (const image of images) {
            const mimeType = image.type;
            const buffer = Buffer.from(await image.arrayBuffer());
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const imageName = `${uniqueSuffix}.${extension}`;

            await writeFile(join(imageUploadDir, imageName), buffer);
            imageFileNames.push(imageName);
        }

        // Delete old images except cover image
        for (const deletedImage of deletedImages) {
            const imagePath = join(imageUploadDir, deletedImage);
            if (deletedImage !== ceremony.coverImage) {
                if (fs.existsSync(imagePath)) {
                    await unlink(imagePath);
                }
            }
        }

        // Update image array
        ceremony.images = ceremony.images.filter((img: string) => !deletedImages.includes(img));
        ceremony.images = [...ceremony.images, ...imageFileNames];

        // Delete extra files, but not cover directory
        const allFiles = await readdir(imageUploadDir);
        const savedFiles = [...imageFileNames, ceremony.coverImage, ...ceremony.images].filter(Boolean);
        for (const file of allFiles) {
            if (!savedFiles.includes(file) && file !== 'cover') {
                await unlink(join(imageUploadDir, file));
            }
        }

        // Update information
        const newFilename = persianToFinglish(title).replace(/[^a-z0-9]/gi, '_').toLowerCase();
        await rename(join(process.cwd(), "public", `/uploads/images/cermony/${safeTitle}`), join(process.cwd(), "public", `/uploads/images/cermony/${newFilename}`));

        ceremony.title = title;
        ceremony.date = date;
        ceremony.description = description;
        if (coverImageName) {
            ceremony.coverImage = coverImageName;
        }

        await ceremony.save();

        return NextResponse.json({ message: MESSAGE.CEREMONY_EDIT }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
}