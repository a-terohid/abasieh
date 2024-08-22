import { ERROR } from '@/types/enums';
import { Ziartnameh } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import ZiartnamehAdminCart from '../constants/ZiartnamehAdminCart';

const ZiaratnamehPage = ({ziartnameha} : any) => {
    
    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >زیارت نامه ها:</h1>
                <Link href="/admin-panel/ziartnameh/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن زیارت نامه</Link>
            </div>
            <div className="flex flex-col gap-y-2 mt-4" >
                {   
                    ziartnameha.length ? 
                    ziartnameha?.map( (ziartnameh : Ziartnameh , index: number)  => (<ZiartnamehAdminCart key={index} ziartnameh={ziartnameh}/>) ) 
                    : <p>{ERROR.NO_ZIARTNAMEH}</p>
                }
            </div>
        </div>
    );
};

export default ZiaratnamehPage;