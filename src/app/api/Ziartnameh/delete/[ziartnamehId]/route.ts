import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";
import Ziartnameh from '@/models/ziaratnameh';



export const DELETE = async ( req : Request, context : any ) => {
    
    try{
        await connectDB()

        const id = context?.params?.ziartnamehId

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

        const ziartnameh = await Ziartnameh.findOne({ _id : id })

            if( !ziartnameh ){
                return NextResponse.json(
                    { error: ERROR.CANT_FIND_ZIARTNAMEH },
                    { status: 404 }
                );
            }


            await ziartnameh.deleteOne({ _id: id });


            return NextResponse.json(
                { message: MESSAGE.ZIARTNAMEH_DELETE },
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