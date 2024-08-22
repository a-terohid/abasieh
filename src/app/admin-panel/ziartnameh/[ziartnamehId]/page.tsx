import Ziartnameh from "@/models/ziaratnameh";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params : {ziartnamehId}}:any) => {

    await connectDB()
    
    const ziartnameh = await Ziartnameh.findOne({ _id : ziartnamehId })
    

    if( !ziartnameh ) {
        return( <div className='flex items-center justify-center h-[500px]' >
                    <h3 className='font-bold text-2xl border-b-4 border-secondary-red-2 py-2' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }

    console.log(ziartnameh);
    

    return (
        <div>
            <h1>{ziartnameh.Title}</h1>
        </div>
    );
};

export default page;