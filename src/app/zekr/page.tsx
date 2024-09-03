import Save from "@/models/save";
import Zekr from "@/models/zekr";
import Zekrpage from "@/template/Zekrpage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "ذکرهای سقایی",
    description: "مجموعه‌ای از ذکرهای معتبر سقایی شامل ذکرهای مشهور و معانی کامل آنها. مناسب برای علاقه‌مندان به اذکار دینی و روحانی.",
    keywords: "ذکر سقایی, اذکار دینی, اذکار روحانی, ذکرهای اسلامی, معنویت, ذکرهای مذهبی",
    robots: "index, follow",
  };
  
  export const viewport = {
    width: "device-width",
    initialScale: 1,
  };

const page = async ({ searchParams }:any) => {

    await connectDB()

    const zekrs = await Zekr.find()
    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = save.Years.sort((a:string, b:string) => parseInt(a) - parseInt(b));

    let finalZekr = zekrs

    

    if (searchParams.year) {
        finalZekr = finalZekr.filter((i:any) => i.Year === searchParams.year);
    }
    
    return ( <Zekrpage zekrs={finalZekr} Years={Years} />);
};

export default page;