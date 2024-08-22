import USER from '@/models/user';
import AdminsPage from '@/template/AdminsPage';
import { ERROR, ROLE } from '@/types/enums';
import connectDB from '@/utils/connectDB';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | مدیر ها",
    description: "قسمت مدیر های پنل ادمین هییت سفایی عباسیه جولان",
    keywords: "پنل ادمین, مدیر ها, هییت سفایی عباسیه جولان",
  };
  


const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )

    const user = await USER.findOne({ email : session?.user?.email })

    if( user.role == ROLE.ADMIN  ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-secondary-red-2 py-2' >{ ERROR.ACCESS_DENIED }</h3>
        </div> )
    }

    const admins = await USER.find({ role : ROLE.ADMIN })

    return ( <AdminsPage admins={admins} /> );
};

export default page;