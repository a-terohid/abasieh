import { toPlain } from "@/utils/toPlain";
import { isValidId } from "@/utils/isValidId";
import Ziartnameh from "@/models/ziaratnameh";
import ZiartnamehDetailsPage from "@/template/ZiartnamehDetailsPage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { ziartnamehId } = await params;
  await connectDB();

  const ziartnameh = (isValidId(ziartnamehId) ? await Ziartnameh.findOne({ _id: ziartnamehId }) : null);

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

  return <ZiartnamehDetailsPage data={toPlain(ziartnameh)} />;
};

export default page;
