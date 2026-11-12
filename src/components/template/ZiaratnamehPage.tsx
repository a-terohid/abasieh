import { ERROR } from '@/types/enums';
import { Ziartnameh } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import ZiartnamehAdminCart from '../constants/ZiartnamehAdminCart';

const ZiaratnamehPage = ({ziartnameha} : any) => {
    
    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >زیارت نامه ها</h1>
                <Link href="/admin-panel/ziartnameh/add" className="btn btn-primary btn-sm" >افزودن زیارت نامه</Link>
            </div>
            <div className="mt-6 grid gap-2" >
                {   
                    ziartnameha.length ? 
                    ziartnameha?.map( (ziartnameh : Ziartnameh , index: number)  => (<ZiartnamehAdminCart key={index} ziartnameh={ziartnameh}/>) ) 
                    : <p className="empty">{ERROR.NO_ZIARTNAMEH}</p>
                }
            </div>
        </div>
    );
};

export default ZiaratnamehPage;
