import Zekr from "@/models/zekr";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params : {zekrId}}:any) => {

    await connectDB()
    
    const zekr = await Zekr.findOne({ _id : zekrId })
    
    if( !zekr ) {
        return( <div className='flex items-center justify-center h-[500px]' >
                    <h3 className='font-bold text-2xl border-b-4 border-secondary-red-2 py-2' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }
    
    return <ZekrDetailspage zekr={JSON.stringify(zekr)} admin={true} />;
};

export default page;