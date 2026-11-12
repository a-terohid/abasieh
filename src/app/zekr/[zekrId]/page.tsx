import { isValidId } from "@/utils/isValidId";
import Zekr from "@/models/zekr";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { zekrId } = await params;
  await connectDB();

  const zekr = (isValidId(zekrId) ? await Zekr.findOne({ _id: zekrId }) : null);

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

const page = async ({ params }: any) => {
  const { zekrId } = await params;
  await connectDB();

  const zekr = (isValidId(zekrId) ? await Zekr.findOne({ _id: zekrId }) : null);

  if (!zekr) {
    return (
      <div className="state">
        <h3 className="state-title">
          {ERROR.ZEKR_DONT_EXIST}
        </h3>
      </div>
    );
  }

  return <ZekrDetailspage zekr={JSON.stringify(zekr)} />;
};

export default page;
