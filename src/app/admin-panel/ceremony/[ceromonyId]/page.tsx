import Ceremony from "@/models/cermony";
import Zekr from "@/models/zekr";
import CeremonyDetailsPage from "@/template/CeremonyDetailsPage";
import ZekrDetailspage from "@/template/ZekrDetailspage";
import { ERROR } from "@/types/enums";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

// متد برای تولید متادیتا دینامیک
export async function generateMetadata({ params: { ceromonyId } }: any): Promise<Metadata> {
  await connectDB();

  const ceremony = await Ceremony.findOne({ _id: ceromonyId });

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

  return <CeremonyDetailsPage ceremony={JSON.stringify(ceremony)} admin={true} />;
};

export default page;