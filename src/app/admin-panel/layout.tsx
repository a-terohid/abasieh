import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import USER from '@/models/user';
import { authOptions } from 'src/components/lib/auth';
import connectDB from '@/utils/connectDB';
import AdminLayout from '@/layout/AdminLayout';
import { ERROR } from '@/types/enums';
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین",
    description: "دنل ادمین هییت سقایی عباشیه جولان",
};


const layout = async ({ children }: {children: React.ReactNode}) => {

    await connectDB();
    const session = await getServerSession( authOptions )
    if ( !session ) redirect("/signin")

    const user = await USER.findOne({ email : session?.user?.email })

    if( !user ) {
        return( <div className='state' >
            <h3 className='state-title' >{ERROR.PROBLEM}</h3>
        </div> )
    }

    return ( <AdminLayout role={user.role} email={user.email}>{ children }</AdminLayout> );
};

export default layout;
