import AddAdminPage from '@/template/AddAdminPage';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import { authOptions } from 'src/components/lib/auth';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | افزودن مدیر | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید مدیران جدیدی را به سیستم اضافه کنید و دسترسی‌های مدیریتی را مدیریت کنید.",
    keywords: "پنل ادمین, افزودن مدیر, مدیریت سایت, هیئت سقایی عباسیه جولان, دسترسی مدیر, مدیران سایت",
  };
  

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    return ( <AddAdminPage /> );
};

export default page;