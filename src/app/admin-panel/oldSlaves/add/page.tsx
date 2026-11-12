import USER from '@/models/user';
import AddOldSlavesPage from '@/template/AddOldSlavesPage';
import AddTrustessPage from '@/template/AddTrustessPage';
import { ROLE } from '@/types/enums';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';


export const metadata: Metadata = {
    title: "پنل ادمین | پیر غلامان | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید اطلاعات پیر غلامان را مشاهده و مدیریت کنید.",
    keywords: "پنل ادمین, پیر غلامان, هیئت سقایی عباسیه جولان, مدیریت پیر غلامان",
};

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    const user = await USER.findOne({ email : session?.user?.email })
    
    if ( !session || !user || user.role === ROLE.ADMIN ) redirect("/")

    return (<AddOldSlavesPage />);
};

export default page;