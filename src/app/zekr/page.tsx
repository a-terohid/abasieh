import { toPlain } from "@/utils/toPlain";
import Save from "@/models/save";
import Zekr from "@/models/zekr";
import Zekrpage from "@/template/Zekrpage";
import connectDB from "@/utils/connectDB";
import { parseJalaliYear } from "@/utils/jalali";
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

const page = async ({ searchParams: searchParamsPromise }:any) => {
    const searchParams = await searchParamsPromise;

    await connectDB()

    const zekrs = await Zekr.find()
    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = [...(save?.Years ?? [])].sort((a:string, b:string) => parseInt(a) - parseInt(b));

    let finalZekr = zekrs

    // `?year=` holds a Jalali year (as stored in Save.Years / Zekr.Year). Compare as years so
    // Persian digits or stray spaces still match; fall back to exact string equality for
    // non-numeric labels. Non-string values (e.g. repeated params) are ignored.
    const yearParam = typeof searchParams?.year === "string" ? searchParams.year : "";
    const wanted = parseJalaliYear(yearParam);

    if (yearParam) {
        finalZekr = finalZekr.filter((i:any) =>
            wanted !== null ? parseJalaliYear(String(i.Year ?? "")) === wanted : i.Year === yearParam);
    }
    
    return ( <Zekrpage zekrs={toPlain(finalZekr)} Years={toPlain(Years)} activeYear={yearParam} />);
};

export default page;
