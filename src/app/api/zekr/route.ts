import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "src/components/lib/auth";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { unlinkSync } from "fs";
import Save from "@/models/save";
import Zekr from "@/models/zekr";

export const POST= async ( req : Request ) => {
    try {

        //conect to database
        await connectDB ()

        //Get Data
        const formData = await req.formData();
        const Title = formData.get("Title") as string || null;
        const Author = formData.get("Author") as string || null;
        const Year = formData.get("Year") as string || null;
        const Zekr_Text = formData.get("Zekr_Text") as string || null;
        const Voice = formData.get("Voice") as File || null;

        let fileName = null;

        //Check Session that is admin or owner that use API
        // const session = await getServerSession( authOptions )
        // if ( !session ) {
        //     return NextResponse.json(
        //         { error: ERROR.LOGIN },
        //         { status: 401 }
        //     );
        // }

        // const user  = await USER.findOne({ email : session?.user?.email })
        // if( !user ) {
        //     return NextResponse.json(
        //         { error: ERROR.CANT_FIND_USER },
        //         { status: 404 }
        //     );
        // }

        if( !Title ||
            !Author ||
            !Year ||
            !Zekr_Text )
            {   
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }


            const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
            const ISExist = save?.Years?.includes(Year)

            if( !ISExist ){
                return NextResponse.json(
                    { error: ERROR.INVALID_YEAR },
                    { status : 422 }
                )
            }     

        if( Voice ) { 
            
            //Create buffer for voice
            const mimeType = Voice.type;
            const buffer = Buffer.from(await Voice.arrayBuffer());

            // create upload path
            const relativeUploadDir = `/uploads/voices/`;
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
    
            if (mimeType === "audio/mpeg") {
            extension = "mp3";
            }
    
            const currentDate = new Date().toISOString().slice(0, 10);
    
            fileName = `${currentDate}$${Voice.name.replace(/\.[^/.]+$/, "")}$${uniqueSuffix}.${extension}`;
    
            //upload file
            await writeFile(`${uploadDir}/${fileName}`, buffer);
        }
    
            const NEW_ZEKR = await Zekr.create({
                Title,
                Author,
                Year,
                Zekr_Text,
                Voice : fileName
            })


            return NextResponse.json(
                { message: MESSAGE.NEW_ZEKR },
                { status: 201 }
            );

    } catch ( e ) {
        console.log(e);
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }
}