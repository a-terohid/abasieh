import { toPlain } from "@/utils/toPlain";
import Ceremony from "@/models/cermony";
import CeremonyPage from "@/template/CeremonyPage";
import connectDB from "@/utils/connectDB";
import { jalaliYearOf, jalaliYearRange, parseJalaliYear } from "@/utils/jalali";
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

const page = async ({ searchParams: searchParamsPromise }:any) => {
    const searchParams = await searchParamsPromise;

    await connectDB()

    // Jalali year filter. Dates are stored as UTC ISO strings, so a Jalali year maps to the
    // half-open range [1 Farvardin Y, 1 Farvardin Y+1) in Tehran time, evaluated by MongoDB.
    const yearParam = typeof searchParams?.year === "string" ? searchParams.year : "";
    const year = parseJalaliYear(yearParam);
    const range = year !== null ? jalaliYearRange(year) : null;

    const ceremonies = await Ceremony
        .find(range ? { date: { $gte: range.start, $lt: range.end } } : {})
        .sort({ date: -1 });

    // Years that actually have ceremonies (lightweight projection) for the filter chips.
    const allDates = await Ceremony.find({}, { date: 1, _id: 0 }).lean();
    const years = Array.from(new Set(allDates.map((c: any) => jalaliYearOf(c.date)).filter((y): y is number => y !== null)));

    const finalceremonies = ceremonies

    return ( <CeremonyPage ceremonies={ toPlain(finalceremonies) } years={years} activeYear={year !== null ? String(year) : ""} /> );
};

export default page;