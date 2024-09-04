import Save from "@/models/save";
import Zekr from "@/models/zekr";
import ZekrEditPage from "@/template/ZekrEditPage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params : {zekrId}}:any) => {

    await connectDB()
    
    const zekr = await Zekr.findOne({ _id : zekrId })
    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = save.Years
    
    if( !zekr ) {
        return( <div className='flex items-center justify-center h-[500px]' >
                    <h3 className='font-bold text-2xl border-b-4 border-secondary-red-2 py-2' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }
    
    return <ZekrEditPage zekr={JSON.stringify(zekr)} years={Years} />;
};

export default page;