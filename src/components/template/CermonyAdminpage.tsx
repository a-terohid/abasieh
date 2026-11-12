import { ERROR } from '@/types/enums';
import { Ceremony } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import CeremonyAdminCard from '../constants/CeremonyAdminCard';

const CermonyAdminpage = ({ceremonies}:any) => {

    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >مراسم ها</h1>
                <Link href="/admin-panel/ceremony/add" className="btn btn-primary btn-sm" >افزودن مراسم</Link>
            </div>
            <div className="mt-6 grid gap-2" >
                {   
                    ceremonies?.length ? 
                    ceremonies?.map( (ceremony : Ceremony , index: number)  => ( <CeremonyAdminCard ceremony={ceremony} key={index} />) ) 
                    : <p className="empty">{ERROR.NO_CEREMNOY}</p>
                }
            </div>
        </div>
    )
};

export default CermonyAdminpage;
