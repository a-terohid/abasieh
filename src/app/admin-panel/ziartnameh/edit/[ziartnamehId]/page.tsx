import { isValidId } from "@/utils/isValidId";
import Ziartnameh from '@/models/ziaratnameh';
import ZiartnamehEditPage from '@/template/ZiartnamehEditPage';
import { ERROR } from '@/types/enums';
import connectDB from '@/utils/connectDB';

const page = async ({ params }: any) => {
  const { ziartnamehId } = await params;
    await connectDB();
  
    const ziartnameh = (isValidId(ziartnamehId) ? await Ziartnameh.findOne({ _id: ziartnamehId }) : null);

    
    if (!ziartnameh) {
        return (
            <div className="state">
          <h3 className="state-title">
            {ERROR.ZIARTNAMEH_DONT_EXIST}
          </h3>
        </div>
      );
    }

    return ( <ZiartnamehEditPage ziartnameh={JSON.stringify(ziartnameh)} /> );
};

export default page;
