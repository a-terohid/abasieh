import Save from '@/models/save';
import TrusteesAdminpage from '@/template/TrusteesAdminpage';
import connectDB from '@/utils/connectDB';
import { sortTrustees } from '@/utils/sortTrustees';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "پنل ادمین | هیئت امنا",
    description: "افراد هیئت امنا در پنل ادمین هییت سقایی عباسیه جولان",
    keywords: "پنل ادمین, هیئت امنا, هییت سقایی عباسیه جولان",
};

const page = async () => {

    await connectDB()

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Trustees = sortTrustees(save.Trustees)

    return ( <TrusteesAdminpage Trusteeses={Trustees} />);
};

export default page;