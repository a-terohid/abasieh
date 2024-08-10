import { getServerSession } from 'next-auth';
import { redirect } from "next/navigation";
import USER from '@/models/user';
import { authOptions } from 'src/components/lib/auth';
import connectDB from '@/utils/connectDB';
import AdminLayout from '@/layout/AdminLayout';
import { ERROR } from '@/types/enums';

const layout = async ({ children }: {children: React.ReactNode}) => {

    await connectDB();
    const session = await getServerSession( authOptions )
    if ( !session ) redirect("/signin")

    const user = await USER.findOne({ email : session?.user?.email })

    if( !user ) {
        return( <div className='flex items-center justify-center h-[500px]' >
            <h3 className='font-bold text-2xl border-b-4 border-secondary-red-2 py-2' >{ERROR.PROBLEM}</h3>
        </div> )
    }

    return ( <AdminLayout role={user.role} email={user.email}>{ children }</AdminLayout> );
};

export default layout;