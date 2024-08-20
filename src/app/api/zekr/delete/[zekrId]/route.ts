import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";
import Zekr from "@/models/zekr";



export const DELETE = async ( req : Request, context : any ) => {
    
    try{
        await connectDB()

        const id = context?.params?.zekrId

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

        const zekr = await Zekr.findOne({ _id : id })

        if( !zekr ){
            return NextResponse.json(
                { error: ERROR.CANT_FIND_ZEKR },
                { status: 404 }
            );
        }


        await zekr.deleteOne({ _id: id });


        return NextResponse.json(
            { message: MESSAGE.ZEKR_DELETE },
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