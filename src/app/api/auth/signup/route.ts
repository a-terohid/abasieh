import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/auth";


export const POST= async ( req : Request ) => {
    
    try{

        await connectDB()

        const { email , password } = await req.json();
        console.log({ email , password });
        if( !email || !password ) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status : 422 }
            )
        }

        console.log("tttt");
        

        const existUser = await USER.findOne({ email })
        if( existUser ){
            return NextResponse.json(
                { error: ERROR.USER_EXIST },
                { status : 422 }
            )
        }


        const hashedPassword = await hashPassword( password )

        const newUser = await USER.create({
            email , 
            password : hashedPassword 
        })
        console.log( newUser );
    

        return NextResponse.json(
            { message : MESSAGE.NEW_USER },
            { status : 201 },
        )
        

    } catch( err ){
        console.log(err);
        return NextResponse.json(
            { error : ERROR.SERVER_ERROR },
            { status : 500 }
        )
    }

}