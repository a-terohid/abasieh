import USER from '@/models/user';
import AddTrustessPage from '@/template/AddTrustessPage';
import { ROLE } from '@/types/enums';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';


export const metadata: Metadata = {
    title: "پنل ادمین | افزودن عضو هیئت امنا | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید اعضای جدیدی را به هیئت امنا اضافه کنید و مدیریت آن‌ها را انجام دهید.",
    keywords: "پنل ادمین, افزودن عضو, هیئت امنا, هیئت سقایی عباسیه جولان, مدیریت اعضا",
};

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    const user = await USER.findOne({ email : session?.user?.email })
    
    if ( !session || user.role === ROLE.ADMIN ) redirect("/")

    return (<AddTrustessPage />);
};

export default page;