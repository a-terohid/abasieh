import { toPlain } from "@/utils/toPlain";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";
import type { Metadata } from "next";
import AddZekrPage from "@/template/AddZekrPage";
import Save from "@/models/save";

export const metadata: Metadata = {
    title: "پنل ادمین | افزودن ذکر | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید ذکر‌های جدیدی را به سیستم اضافه کنید و آن‌ها را برای کاربران منتشر نمایید.",
    keywords: "پنل ادمین, افزودن ذکر, مدیریت ذکر, هیئت سقایی عباسیه جولان, ذکر‌های اهل بیت, متون مقدس",
};

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = save?.Years ?? []

    return ( <AddZekrPage years={toPlain(Years)} /> );
};

export default page;