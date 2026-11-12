import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "src/components/lib/auth";
import fs from "fs";
import path, { join } from "path";
import { persianToFinglish } from "@/utils/prTOen";
import { mkdir, writeFile, stat, readdir, unlink, rename } from "fs/promises";
import mime from "mime";
import BlogPost from "@/models/blogs";

export async function POST(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();
        const title = formData.get("title") as string || null;
        const content = formData.get("content") as string || null;
        const author = formData.get("author") as string || null;
        const thumbnailUrl = formData.get("thumbnailUrl") as File || null;

        let thumbnailUrlName: string | undefined;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        const user = await USER.findOne({ email: session?.user?.email });
        if (!user) {
            return NextResponse.json({ error: ERROR.CANT_FIND_USER }, { status: 404 });
        }

        if (!title || !content || !author || !thumbnailUrl) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 422 });
        }

        const enTitle = persianToFinglish(title);
        const safeTitle = enTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const coverDir = `/uploads/images/blog/${safeTitle}/cover`;
        const coverUploadDir = join(process.cwd(), "public", coverDir);
        const imageDir = `/uploads/images/blog/${safeTitle}`;
        const imageUploadDir = join(process.cwd(), "public", imageDir);

       await mkdir(coverUploadDir, { recursive: true });
        await mkdir(imageUploadDir, { recursive: true });


        if (thumbnailUrl) {
            const mimeType = thumbnailUrl.type;
            const buffer = Buffer.from(await thumbnailUrl.arrayBuffer());
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const currentDate = new Date().toISOString().slice(0, 10);
            thumbnailUrlName = `${currentDate}$${thumbnailUrl.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;

            await writeFile(join(coverUploadDir, thumbnailUrlName), buffer);
        }

        let parsedContent = JSON.parse(content);
        let uploadedImageUrls: string[] = [];


        parsedContent = await Promise.all(parsedContent.map(async (node: any) => {
            if (node.type === 'image') {
                const imageBuffer = Buffer.from(new Uint8Array((await (await fetch(node.src)).arrayBuffer()) as ArrayBuffer));
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                const extension = mime.getExtension('image/jpeg'); // فرض بر jpeg بودن عکس
                const fileName = `${uniqueSuffix}.${extension}`;

                await writeFile(join(imageUploadDir, fileName), imageBuffer);

                // URL جدید تصویر را جایگزین می‌کنیم
                const imageUrl = `/uploads/images/blog/${safeTitle}/${fileName}`;
                return { ...node, src: imageUrl };
            }
            return node;
        }));

        // ذخیره مقاله در پایگاه داده
        const newBlog = await BlogPost.create({
            title,
            author,
            content: JSON.stringify(parsedContent), 
            thumbnailUrl: thumbnailUrlName,
        });

        return NextResponse.json({ message: MESSAGE.NEW_BLOG }, { status: 201 });

    } catch (err) {
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
}