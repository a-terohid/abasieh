import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";
import Ceremony from "@/models/cermony";
import { persianToFinglish } from "@/utils/prTOen";
import path from "path";
import fs from 'fs';



export const DELETE = async ( req : Request, context : any ) => {
    
    try{
        await connectDB()

        const id = context?.params?.ceremonyId

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

        const ceremony = await Ceremony.findOne({ _id : id })

        
        if( !ceremony ){
            return NextResponse.json(
                { error: ERROR.CANT_FIND_CEREMONY },
                { status: 404 }
            );
        }
        
        const EnTitle  = persianToFinglish(ceremony.title)

        const fullPath = path.resolve('public/uploads/images/cermony', EnTitle);
    
        try {

            await fs.rmSync(fullPath, { recursive: true, force: true });
          } catch (error) {
            console.error("Error removing ceremony files:", error);
            return NextResponse.json(
              { error: ERROR.SERVER_ERROR },
              { status: 500 }
            );
          }
      

        await ceremony.deleteOne({ _id: id });

        return NextResponse.json(
            { message: MESSAGE.CEREMONY_DELETE },
            { status: 200 }
            );

    } catch( err ){
        console.log(err);
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}