import { toPlain } from "@/utils/toPlain";
import { isValidId } from "@/utils/isValidId";
import Ceremony from '@/models/cermony';
import EditCeremonyPage from '@/template/EditCeremonyPage';
import { ERROR } from '@/types/enums';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: "پنل ادمین | ویرایش مراسم | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید مراسم را ویرایش کنید و آن‌ها را برای کاربران منتشر نمایید.",
    keywords: "پنل ادمین, ویرایش مراسم, مدیریت مراسم, هیئت سقایی عباسیه جولان, مراسم اهل بیت, متون مقدس",
};

const page = async ({ params }: any) => {
  const { ceromonyId } = await params;
  
    await connectDB();
  
    const ceremony = (isValidId(ceromonyId) ? await Ceremony.findOne({ _id: ceromonyId }) : null);
  
    if (!ceremony) {
      return (
        <div className="state">
          <h3 className="state-title">
            {ERROR.CEREMONY_DONT_EXIST}
          </h3>
        </div>
      );
    }
    return ( <EditCeremonyPage ceremony={toPlain(ceremony)} /> );
};

export default page;
