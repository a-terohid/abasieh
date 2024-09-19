import Save from "@/models/save";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import path, { join } from "path";
import { authOptions } from "src/components/lib/auth";
import mime from "mime";
import { stat, mkdir, writeFile } from "fs/promises";
import fs from "fs";
import { TRUSTEES_PERSONE } from "@/types/types";

export async function POST( req : Request ){

    try{

        await connectDB()

        const formData = await req.formData();
        const fullName = formData.get("fullName") as string || null;
        const phone = formData.get("phone") as string || null;
        const role = formData.get("role") as string || null;
        const img = formData.get("img") as File || null;

        let fileName = null;

        const session = await getServerSession( authOptions )
        if ( !session ) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        if( !fullName || !phone || !role ) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status : 422 }
            )
        }

            const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
            const { Trustees } = save

            if( img ) { 
            
                //Create buffer for voice
                const mimeType = img.type;
                const buffer = Buffer.from(await img.arrayBuffer());
    
                // create upload path
                const relativeUploadDir = `/uploads/images/Trustees`;
                const uploadDir = join(process.cwd(), "public", relativeUploadDir);
        
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
        
                // create uniqe voice name 
                const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                let extension = mime.getExtension(mimeType);

        
                const currentDate = new Date().toISOString().slice(0, 10);
        
                fileName = `${currentDate}$${img.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;
        
                //upload file
                await writeFile(`${uploadDir}/${fileName}`, buffer);
            }

            const newTrustees = {
                fullName,
                phone,
                role,
                img: fileName
            }

            const trustees = [ ... save.Trustees , newTrustees ]

            save.Trustees = trustees
            save.save()


            return NextResponse.json(
                { message: MESSAGE.NEW_TRUSTEES},
                { status: 201 }
            );

    } catch( err ){
        console.log(err);
        
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}


export async function PATCH(req: Request) {
    try {
        await connectDB();

        const formData = await req.formData();
        const fullName = formData.get("fullName") as string || null;
        const phone = formData.get("phone") as string || null;
        const role = formData.get("role") as string || null;
        const img = formData.get("img") as File || null;
        const id = formData.get("id") as string || null;
        const isChecked = formData.get("isChecked") as string || null;;
        
        let fileName = null;

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: ERROR.LOGIN }, { status: 401 });
        }

        if (!fullName || !phone || !role) {
            return NextResponse.json({ error: ERROR.INVALID_DATA }, { status: 422 });
        }

        const save = await Save.findOne({ _id: process.env.SAVE_DATA_BASE_ID });
        const { Trustees } = save;
        const ISExist = Trustees.find((person: TRUSTEES_PERSONE) => person._id == id);

        if (!ISExist) {
            return NextResponse.json({ error: ERROR.CANT_FIND_TRUSTEES }, { status: 404 });
        }

        // به روز رسانی اطلاعات
        ISExist.fullName = fullName;
        ISExist.phone = phone;
        ISExist.role = role;

        // فقط در صورتی که تصویر جدید بارگذاری شده باشد
        if (img && isChecked === "true") {
            // حذف تصویر قدیمی اگر وجود داشته باشد
            if (ISExist.img) {
                const fullPath = path.resolve('public/uploads/images/Trustees', ISExist.img);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }

            // بارگذاری تصویر جدید
            const mimeType = img.type;
            const buffer = Buffer.from(await img.arrayBuffer());

            const relativeUploadDir = `/uploads/images/Trustees`;
            const uploadDir = join(process.cwd(), "public", relativeUploadDir);

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

            // ایجاد نام فایل یکتا
            const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            const extension = mime.getExtension(mimeType);
            const currentDate = new Date().toISOString().slice(0, 10);
            fileName = `${currentDate}$${img.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;

            // آپلود فایل
            await writeFile(`${uploadDir}/${fileName}`, buffer);

            // به روز رسانی مسیر تصویر در دیتابیس
            ISExist.img = fileName;
        }

        // ذخیره تغییرات
        await save.save();

        return NextResponse.json({ message: MESSAGE.TRUSTEES_EDIT }, { status: 201 });

    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: ERROR.SERVER_ERROR }, { status: 500 });
    }
}