import Ceremony from "@/models/cermony";
import CeremonyPage from "@/template/CeremonyPage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "مراسم‌ها",
    description: "مجموعه‌ای از مراسم‌های هیئت سقایی عباسیه جولان شامل مراسم‌های معنوی و دینی. مناسب برای علاقه‌مندان به شرکت در این مراسم‌ها و پیروی از مسیر معنوی.",
    keywords: "مراسم سقایی, مراسم دینی, مراسم مذهبی, هیئت سقایی عباسیه جولان, معنویت, مراسم‌های اسلامی",
    robots: "index, follow",
};
  
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const page = async ({ searchParams }:any) => {

    await connectDB()

    const ceremonies = await Ceremony.find()

    const finalceremonies = ceremonies

    return ( <CeremonyPage ceremonies={ finalceremonies } /> );
};

export default page;