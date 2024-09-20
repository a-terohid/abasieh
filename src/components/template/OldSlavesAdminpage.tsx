import { ERROR } from '@/types/enums';
import { OLD_SLAVES } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import TrustesCart from '../constants/TrustesCart';
import OldSlavesCart from '../constants/OldSlavesCart';

const OldSlavesAdminpage = ({OldSlaves}:any) => {

    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >  پیرغلامان:</h1>
                <Link href="/admin-panel/oldSlaves/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن پیر غلام</Link>
            </div>
            <div className="flex flex-wrap mb-5 items-center justify-center gap-y-4 md:gap-6 lg:gap-8 mt-8" >
                {   
                    OldSlaves.length ? 
                    OldSlaves?.map( (OLS : OLD_SLAVES , index: number)  => (<OldSlavesCart key={index} OLS={JSON.stringify(OLS)} admin={true} />) ) 
                    : <p>{ERROR.NO_OLD_SLAVES}</p>
                }
            </div>
        </div>
    );
};

export default OldSlavesAdminpage;