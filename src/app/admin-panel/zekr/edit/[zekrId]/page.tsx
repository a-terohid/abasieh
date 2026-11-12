import { toPlain } from "@/utils/toPlain";
import { isValidId } from "@/utils/isValidId";
import Save from "@/models/save";
import Zekr from "@/models/zekr";
import ZekrEditPage from "@/template/ZekrEditPage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params }: any) => {
  const { zekrId } = await params;

    await connectDB()
    
    const zekr = (isValidId(zekrId) ? await Zekr.findOne({ _id: zekrId }) : null)
    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = save?.Years ?? []
    
    if( !zekr ) {
        return( <div className='state' >
                    <h3 className='state-title' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }
    
    return <ZekrEditPage zekr={JSON.stringify(zekr)} years={toPlain(Years)} />;
};

export default page;
