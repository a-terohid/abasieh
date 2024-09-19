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

const page = async ({ params: { ceromonyId } }: any) => {
  
    await connectDB();
  
    const ceremony = await Ceremony.findOne({ _id: ceromonyId });
  
    if (!ceremony) {
      return (
        <div className="flex items-center justify-center h-[500px]">
          <h3 className="font-bold text-2xl border-b-4 border-secondary-red-2 py-2">
            {ERROR.CEREMONY_DONT_EXIST}
          </h3>
        </div>
      );
    }
    return ( <EditCeremonyPage ceremony={ceremony} /> );
};

export default page;