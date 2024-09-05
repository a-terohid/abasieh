import Save from '@/models/save';
import USER from '@/models/user';
import TrustessEditpage from '@/template/TrustessEditpage';
import { ERROR, ROLE } from '@/types/enums';
import { TRUSTEES_PERSONE } from '@/types/types';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';

export const metadata: Metadata = {
    title: "پنل ادمین | ویرایش عضو هیئت امنا | هیئت سقایی عباسیه جولان",
    description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید اعضای هیئت امنا را ویرایش کنید و مدیریت آن‌ها را انجام دهید.",
    keywords: "پنل ادمین, ویرایش عضو, هیئت امنا, هیئت سقایی عباسیه جولان, مدیریت اعضا",
};

const page = async ({ params: { trusteesId } }: any) => {


    await connectDB();

    const session = await getServerSession( authOptions )
    const user = await USER.findOne({ email : session?.user?.email })
    
    if ( !session || user.role === ROLE.ADMIN ) redirect("/")

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const { Trustees } = save
    const trustess = Trustees.find((person : TRUSTEES_PERSONE) => person._id == trusteesId );

    
    if (!trustess) {
        return (
            <div className="flex items-center justify-center h-[500px]">
          <h3 className="font-bold text-2xl border-b-4 border-secondary-red-2 py-2">
            {ERROR.ZIARTNAMEH_DONT_EXIST}
          </h3>
        </div>
      );
    }

    return ( <TrustessEditpage trustess={JSON.stringify(trustess)} /> );
};

export default page;