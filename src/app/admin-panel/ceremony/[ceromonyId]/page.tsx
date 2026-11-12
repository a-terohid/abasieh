import { isValidId } from "@/utils/isValidId";
import Ceremony from "@/models/cermony";
import Zekr from "@/models/zekr";
import CeremonyDetailsPage from "@/template/CeremonyDetailsPage";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { ceromonyId } = await params;
  await connectDB();

  const ceremony = (isValidId(ceromonyId) ? await Ceremony.findOne({ _id: ceromonyId }) : null);

  if (!ceremony) {
    return {
      title: "ذکر پیدا نشد",
      description: "متاسفانه ذکر مورد نظر پیدا نشد.",
      keywords: "ذکر, خطا, پیدا نشد",
    };
  }

  return {
    title: ceremony.title,
    description: ceremony.description,
    keywords: "مراسم سقایی, مراسم دینی, مراسم مذهبی, هیئت سقایی عباسیه جولان, معنویت, مراسم‌های اسلامی",
    robots: "index, follow",
  };
}

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

  return <CeremonyDetailsPage ceremony={JSON.stringify(ceremony)} admin={true} />;
};

export default page;
