import Zekr from '@/models/zekr';
import ZekrAdminPage from '@/template/ZekrAdminPage';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "پنل ادمین | ذکرها",
    description: "قسمت ذکرهای پنل ادمین هییت سقایی عباسیه جولان",
    keywords: "پنل ادمین, ذکرها, هییت سقایی عباسیه جولان",
};
  

const page = async () => {

    await connectDB()

    const zekrha = await Zekr.find()

    return ( <ZekrAdminPage zekr={zekrha} /> );
};

export default page;