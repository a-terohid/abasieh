import { ERROR } from '@/types/enums';
import { TRUSTEES_PERSONE } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import TrustesCart from '../constants/TrustesCart';

const TrusteesAdminpage = ({Trusteeses}:any) => {

    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" > هیئت امنا:</h1>
                <Link href="/admin-panel/trustees/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن عضو</Link>
            </div>
            <div className="flex flex-wrap mb-5 items-center justify-center gap-y-4 md:gap-6 lg:gap-8 mt-8" >
                {   
                    Trusteeses.length ? 
                    Trusteeses?.map( (trs : TRUSTEES_PERSONE , index: number)  => (<TrustesCart key={index} trs={JSON.stringify(trs)} admin={true} />) ) 
                    : <p>{ERROR.NO_TRUSTEES}</p>
                }
            </div>
        </div>
    );
};

export default TrusteesAdminpage;