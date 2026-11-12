import { toPlain } from "@/utils/toPlain";
import { isValidId } from "@/utils/isValidId";
import Ziartnameh from "@/models/ziaratnameh";
import ZiartnamehDetailsPage from "@/template/ZiartnamehDetailsPage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";

const page = async ({ params }: any) => {
  const { ziartnamehId } = await params;

    await connectDB()
    
    const ziartnameh = (isValidId(ziartnamehId) ? await Ziartnameh.findOne({ _id: ziartnamehId }) : null)
    
    if( !ziartnameh ) {
        return( <div className='state' >
                    <h3 className='state-title' >{ERROR.ZIARTNAMEH_DONT_EXIST}</h3>
                </div>)
    }
    
    return ( <ZiartnamehDetailsPage data={toPlain(ziartnameh)} admin={true} /> );
};

export default page;
