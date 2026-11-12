import { ERROR } from '@/types/enums';
import { TRUSTEES_PERSONE } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import TrustesCart from '../constants/TrustesCart';

const TrusteesAdminpage = ({Trusteeses}:any) => {

    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >هیئت امنا</h1>
                <Link href="/admin-panel/trustees/add" className="btn btn-primary btn-sm" >افزودن عضو</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3" >
                {   
                    Trusteeses.length ? 
                    Trusteeses?.map( (trs : TRUSTEES_PERSONE , index: number)  => (<TrustesCart key={index} trs={JSON.stringify(trs)} admin={true} />) ) 
                    : <p className="empty">{ERROR.NO_TRUSTEES}</p>
                }
            </div>
        </div>
    );
};

export default TrusteesAdminpage;
