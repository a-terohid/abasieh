import { toPlain } from "@/utils/toPlain";
import Ziartnameh from '@/models/ziaratnameh';
import ZiaratnamehPage from '@/template/ZiaratnamehPage';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | زیارت نامه ها",
    description: "قسمت زیارت نامه های پنل ادمین هییت سقایی عباسیه جولان",
    keywords: "پنل ادمین, زیارت نامه ها, هییت سقایی عباسیه جولان",
};
  


const page = async () => {

    await connectDB();

    const ziartnameha = await Ziartnameh.find()

    return ( <ZiaratnamehPage ziartnameha={toPlain(ziartnameha)} /> );
};

export default page;