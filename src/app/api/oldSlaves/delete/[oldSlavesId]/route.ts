import { OLD_SLAVES } from "@/types/types";
import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";
import Save from "@/models/save";
import path from 'path';
import fs from 'fs';


export const DELETE = async (req: Request, context: any) => {
    try {
        await connectDB()

        const id = context?.params?.oldSlavesId
        const session = await getServerSession(authOptions)
        
        if (!session) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        const user = await USER.findOne({ email: session?.user?.email })
        if (!user) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        const save = await Save.findOne({ _id: process.env.SAVE_DATA_BASE_ID })
        const { OldSlaves } = save
        const ISExist = OldSlaves.find((OL: OLD_SLAVES) => OL._id == id);

        if (!ISExist) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_OLD_SLAVES },
                { status: 404 }
            );
        }

        // بررسی و حذف فایل تصویر
        if (ISExist.img) {
            const fullPath = path.resolve('public/uploads/images/Trustees', ISExist.img);

            if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
            } else {
                console.warn(`File not found: ${fullPath}`);
            }
        } else {
            console.warn("Image path is null or undefined");
        }

        const oldSlaves = OldSlaves.filter((OL: OLD_SLAVES) => OL._id != id)

        save.OldSlaves = oldSlaves
        await save.save()

        return NextResponse.json(
            { message: MESSAGE.OLD_SLAVES_DELETE },
            { status: 200 }
        );

    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: ERROR.SERVER_ERROR },
            { status: 500 }
        );
    }
}