import React from 'react';
import TrustesCart from '../constants/TrustesCart';
import { OLD_SLAVES, TRUSTEES_PERSONE } from '@/types/types';
import OldSlavesCart from '../constants/OldSlavesCart';

const OldSlavesPage = ({OldSlaves}:any) => {
    return (
        <div className=" container mt-5 md:mt-8 ">
        <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
            <div>
                <h1 className=" font-bold md:text-2xl text-lg">پیرغلامان</h1>
                <p className="text-justify mt-3 indent-3">    در این بخش از سایت، نام، عکس و تاریخ فوت پیر غلامان هیئت سقایی عباسیه جولان نمایش داده شده است. این افراد در طول زندگی خود نقش‌های مهمی در هیئت داشته‌اند و یاد آن‌ها همیشه زنده خواهد ماند.</p>
            </div>
            <div className="mt-6" >
                <h1 className=" font-bold md:text-2xl text-lg">لیست پیر غلامان</h1>
                <div className="my-6" >{
                        OldSlaves.length ? <div className="flex flex-wrap gap-4 justify-center ">{
                            OldSlaves.map( (OLS : OLD_SLAVES , index: number)  => (<OldSlavesCart key={index} OLS={JSON.stringify(OLS)} />) ) 
                            }</div> 
                            : <div className="flex items-center justify-center" >
                                <p className="font-bold text-primary-red-3" >متاسفانه پیر غلامی یافت نشد!</p>
                            </div>
                    
                }</div>
            </div>
        </div>
    </div>
    );
};

export default OldSlavesPage;