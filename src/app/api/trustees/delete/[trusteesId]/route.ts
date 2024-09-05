import { TRUSTEES_PERSONE } from './../../../../../types/types';
import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "src/components/lib/auth";
import Save from "@/models/save";
import path from 'path';
import fs from 'fs';


export const DELETE = async ( req : Request, context : any ) => {
    
    try{
        await connectDB()

        const id = context?.params?.trusteesId

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

        const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
        const { Trustees } = save

        const ISExist = Trustees.find((person : TRUSTEES_PERSONE) => person._id == id);


        if( !ISExist ){
            return NextResponse.json(
                { error: ERROR.CANT_FIND_TRUSTEES },
                { status: 404 }
            );
        }

        const fullPath = path.resolve('public/uploads/images/Trustees', ISExist.img);
    
        fs.unlinkSync(fullPath)


        const trustees = Trustees.filter( (person : TRUSTEES_PERSONE) => person._id != id )

        save.Trustees = trustees
        save.save()


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