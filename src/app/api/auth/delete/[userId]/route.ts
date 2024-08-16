import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";


export const DELETE = async ( req : Request, context : any ) => {
    
    try{
        await connectDB()

        const id = context?.params?.userId

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

        const admin = await USER.findOne({ _id : id })

            if( !admin ){
                return NextResponse.json(
                    { error: ERROR.CANT_FIND_ADMIN },
                    { status: 404 }
                );
            }


            await admin.deleteOne({ _id: id });


            return NextResponse.json(
                { message: MESSAGE.ADMIN_DELETE },
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