import AddziartnamehPage from "@/template/AddziartnamehPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | افزودن زیارت‌نامه | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید زیارت‌نامه‌های جدیدی را به سیستم اضافه کنید و آن‌ها را برای کاربران منتشر نمایید.",
    keywords: "پنل ادمین, افزودن زیارت‌نامه, مدیریت زیارت‌نامه, هیئت سقایی عباسیه جولان, زیارت‌نامه‌های اهل بیت, متون مقدس",
};
  

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    return ( <AddziartnamehPage /> );
};

export default page;