import { ERROR } from '@/types/enums';
import { Ceremony } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import CeremonyAdminCard from '../constants/CeremonyAdminCard';

const CermonyAdminpage = ({ceremonies}:any) => {

    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >مراسم ها:</h1>
                <Link href="/admin-panel/ceremony/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن مراسم</Link>
            </div>
            <div className="flex flex-col gap-y-2 mt-4" >
                {   
                    ceremonies?.length ? 
                    ceremonies?.map( (ceremony : Ceremony , index: number)  => ( <CeremonyAdminCard ceremony={ceremony} key={index} />) ) 
                    : <p>{ERROR.NO_CEREMNOY}</p>
                }
            </div>
        </div>
    )
};

export default CermonyAdminpage;