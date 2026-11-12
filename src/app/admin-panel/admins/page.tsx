import { toPlain } from "@/utils/toPlain";
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

    if( !user || user.role == ROLE.ADMIN  ) {
        return( <div className='state' >
            <h3 className='state-title' >{ ERROR.ACCESS_DENIED }</h3>
        </div> )
    }

    const admins = await USER.find({ role : ROLE.ADMIN })

    return ( <AdminsPage admins={toPlain(admins)} /> );
};

export default page;
