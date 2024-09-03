import Zekr from "@/models/zekr";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params: { zekrId } }: any): Promise<Metadata> {
  await connectDB();

  const zekr = await Zekr.findOne({ _id: zekrId });

  if (!zekr) {
    return {
      title: "ذکر پیدا نشد",
      description: "متاسفانه ذکر مورد نظر پیدا نشد.",
      keywords: "ذکر, خطا, پیدا نشد",
    };
  }

  return {
    title: zekr.Title,
    description: zekr.Tear,
    keywords: "ذکر سقایی, اذکار دینی, اذکار روحانی, ذکرهای اسلامی, معنویت, ذکرهای مذهبی",
    robots: "index, follow",
  };
}

const page = async ({ params: { zekrId } }: any) => {
  await connectDB();

  const zekr = await Zekr.findOne({ _id: zekrId });

  if (!zekr) {
    return (
      <div className="flex items-center justify-center h-[500px]">
        <h3 className="font-bold text-2xl border-b-4 border-secondary-red-2 py-2">
          {ERROR.ZEKR_DONT_EXIST}
        </h3>
      </div>
    );
  }

  return <ZekrDetailspage zekr={JSON.stringify(zekr)} />;
};

export default page;
