import { ERROR } from '@/types/enums';
import { OLD_SLAVES } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import TrustesCart from '../constants/TrustesCart';
import OldSlavesCart from '../constants/OldSlavesCart';

const OldSlavesAdminpage = ({OldSlaves}:any) => {

    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >پیرغلامان</h1>
                <Link href="/admin-panel/oldSlaves/add" className="btn btn-primary btn-sm" >افزودن پیر غلام</Link>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 xl:grid-cols-3" >
                {   
                    OldSlaves.length ? 
                    OldSlaves?.map( (OLS : OLD_SLAVES , index: number)  => (<OldSlavesCart key={index} OLS={JSON.stringify(OLS)} admin={true} />) ) 
                    : <p className="empty">{ERROR.NO_OLD_SLAVES}</p>
                }
            </div>
        </div>
    );
};

export default OldSlavesAdminpage;
