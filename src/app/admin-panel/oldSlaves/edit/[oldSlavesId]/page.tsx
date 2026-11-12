import Save from '@/models/save';
import USER from '@/models/user';
import EditOldSlavesPage from '@/template/EditOldSlavesPage';
import TrustessEditpage from '@/template/TrustessEditpage';
import { ERROR, ROLE } from '@/types/enums';
import { OLD_SLAVES, TRUSTEES_PERSONE } from '@/types/types';
import connectDB from '@/utils/connectDB';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { authOptions } from 'src/components/lib/auth';

export const metadata: Metadata = {
  title: "پنل ادمین | ویرایش پیر غلامان | هیئت سقایی عباسیه جولان",
  description: "در این بخش از پنل ادمین هیئت سقایی عباسیه جولان، می‌توانید اطلاعات پیر غلامان را ویرایش و مدیریت کنید.",
  keywords: "پنل ادمین, ویرایش پیر غلامان, هیئت سقایی عباسیه جولان, مدیریت پیر غلامان",
};

const page = async ({ params }: any) => {
  const { oldSlavesId } = await params;


    await connectDB();
    
    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const OldSlaves = save?.OldSlaves ?? []
    const oldSlaves = OldSlaves.find((OLD : OLD_SLAVES) => OLD._id == oldSlavesId );

    
    if (!oldSlaves) {
        return (
            <div className="state">
          <h3 className="state-title">
            {ERROR.OLD_SLAVES_EXIST}
          </h3>
        </div>
      );
    }

    return ( <EditOldSlavesPage oldSlaves={JSON.stringify(oldSlaves)} /> );
};

export default page;
