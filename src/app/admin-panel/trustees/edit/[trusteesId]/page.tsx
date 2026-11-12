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

const page = async ({ params }: any) => {
  const { trusteesId } = await params;


    await connectDB();

    const session = await getServerSession( authOptions )
    const user = await USER.findOne({ email : session?.user?.email })
    
    if ( !session || !user || user.role === ROLE.ADMIN ) redirect("/")

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Trustees = save?.Trustees ?? []
    const trustess = Trustees.find((person : TRUSTEES_PERSONE) => person._id == trusteesId );

    
    if (!trustess) {
        return (
            <div className="state">
          <h3 className="state-title">
            {ERROR.ZIARTNAMEH_DONT_EXIST}
          </h3>
        </div>
      );
    }

    return ( <TrustessEditpage trustess={JSON.stringify(trustess)} /> );
};

export default page;
