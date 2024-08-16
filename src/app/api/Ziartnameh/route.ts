import USER from "@/models/user";
import Ziartnameh from "@/models/ziaratnameh";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "src/components/lib/auth";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";

export const POST= async ( req : Request ) => {
    try {

        //conect to database
        await connectDB ()

        //Get Data
        const formData = await req.formData();
        const Title = formData.get("Title") as string || null;
        const Description = formData.get("Description") as string || null;
        const Text = formData.get("Text") as string || null;
        const Voice = formData.get("Voice") as File || null;

        let fileName = null;

        //Check Session that is admin or owner that use API
        const session = await getServerSession( authOptions )
        if ( !session ) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        const user  = await USER.findOne({ email : session?.user?.email })
        if( !user ) {
            return NextResponse.json(
                { error: ERROR.CANT_FIND_USER },
                { status: 404 }
            );
        }

        if( !Title ||
            !Description ||
            !Text )
            {   
                return NextResponse.json(
                    { error: ERROR.INVALID_DATA },
                    { status : 422 }
                )
            }

        // upload Voice of ziartnameh id its is existing
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
    

            // creatw new Ziartnameh 
            const NEW_ZIARTNAMEH = await Ziartnameh.create({
                Title,
                Description,
                Text,
                Voice : fileName
            })

            console.log( NEW_ZIARTNAMEH );

            return NextResponse.json(
                { message: MESSAGE.NEW_ZIARTNAMEH },
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