import AddCeremony from "@/template/AddCeremony";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";

export const metadata: Metadata = {
    title: "پنل ادمین | افزودن مراسم | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید مراسم جدیدی را به سیستم اضافه کنید و آن‌ها را برای کاربران منتشر نمایید.",
    keywords: "پنل ادمین, افزودن مراسم, مدیریت مراسم, هیئت سقایی عباسیه جولان, مراسم اهل بیت, متون مقدس",
};

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    return ( <AddCeremony /> );
};

export default page;