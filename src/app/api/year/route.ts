import Save from "@/models/save";
import USER from "@/models/user";
import { ERROR, MESSAGE } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "src/components/lib/auth";


export async function POST( req : Request ){

    try{

        await connectDB()

        const { year } = await req.json()

        const session = await getServerSession( authOptions )
        if ( !session ) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        if( !year ) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status : 422 }
            )
        }

            const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
            const ISExist = save?.Years?.includes(year)

            if( ISExist ){
                return NextResponse.json(
                    { error: ERROR.YEAR_EXIST },
                    { status : 422 }
                )
            }       
            
            const years = [ ... save.Years , year ]

            save.Years = years
            save.save()

            return NextResponse.json(
                { message: MESSAGE.NEW_YEARS },
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


export async function DELETE( req : Request ){

    try{

        await connectDB()

        const { year } = await req.json()

        const session = await getServerSession( authOptions )
        if ( !session ) {
            return NextResponse.json(
                { error: ERROR.LOGIN },
                { status: 401 }
            );
        }

        if( !year ) {
            return NextResponse.json(
                { error: ERROR.INVALID_DATA },
                { status : 422 }
            )
        }

            const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
            const ISExist = save?.Years?.includes(year)

            if( !ISExist ){
                return NextResponse.json(
                    { error: ERROR.INVALID_YEAR },
                    { status : 422 }
                )
            }       
            
            const years = save.Years.filter( (YEAR : string) => YEAR !== year )

            save.Years = years
            save.save()

            return NextResponse.json(
                { message: MESSAGE.YEAR_DELETED},
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