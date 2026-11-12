import { isValidId } from "@/utils/isValidId";
import Zekr from "@/models/zekr";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params }: any) => {
  const { zekrId } = await params;

    await connectDB()
    
    const zekr = (isValidId(zekrId) ? await Zekr.findOne({ _id: zekrId }) : null)
    
    if( !zekr ) {
        return( <div className='state' >
                    <h3 className='state-title' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }
    
    return <ZekrDetailspage zekr={JSON.stringify(zekr)} admin={true} />;
};

export default page;
