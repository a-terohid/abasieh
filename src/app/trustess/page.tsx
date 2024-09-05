import Save from '@/models/save';
import TrusstesPage from '@/template/TrusstesPage';
import connectDB from '@/utils/connectDB';
import { sortTrustees } from '@/utils/sortTrustees';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "هیئت امنا | هیئت سقایی عباسیه جولان",
    description: "در این بخش از سایت، اعضای هیئت امنای هیئت سقایی عباسیه جولان معرفی می‌شوند و می‌توانید با نقش و مسئولیت‌های آن‌ها آشنا شوید.",
    keywords: "هیئت امنا, هیئت سقایی عباسیه جولان, نقش‌های هیئت امنا, مسئولیت‌های هیئت امنا, اعضای هیئت امنا",
    robots: "index, follow",
};

const page = async () => {

    await connectDB()

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Trustees = sortTrustees(save.Trustees)

    return ( <TrusstesPage Trustees={Trustees} /> );
};

export default page;