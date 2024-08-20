import Ziartnameh from '@/models/ziaratnameh';
import ZiaratnamehPage from '@/template/ZiaratnamehPage';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )

    const ziartnameha = await Ziartnameh.find()

    return ( <ZiaratnamehPage ziartnameha={ziartnameha} /> );
};

export default page;