import Ziartnameh from "@/models/ziaratnameh";
import ZiartnamehDetailsPage from "@/template/ZiartnamehDetailsPage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params: { ziartnamehId } }: any): Promise<Metadata> {
  await connectDB();

  const ziartnameh = await Ziartnameh.findOne({ _id: ziartnamehId });

  if (!ziartnameh) {
    return {
      title: "زیارت‌نامه پیدا نشد",
      description: "متاسفانه زیارت‌نامه مورد نظر پیدا نشد.",
      keywords: "زیارت‌نامه, خطا, پیدا نشد",
    };
  }

  return {
    title: ziartnameh.Title,
    description: ziartnameh.Description,
    keywords: "زیارت‌نامه اهل بیت, زیارت عاشورا, زیارت جامعه کبیره, زیارت امام حسین, زیارت‌نامه امام رضا, متون مقدس, دعاهای دینی, زیارت‌نامه آنلاین",
    robots: "index, follow",
  };
}

const page = async ({ params: { ziartnamehId } }: any) => {
  await connectDB();

  const ziartnameh = await Ziartnameh.findOne({ _id: ziartnamehId });

  if (!ziartnameh) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <h3 className="font-bold text-2xl border-b-4 border-secondary-red-2 py-2">
          {ERROR.ZIARTNAMEH_DONT_EXIST}
        </h3>
      </div>
    );
  }

  return <ZiartnamehDetailsPage data={ziartnameh} />;
};

export default page;
