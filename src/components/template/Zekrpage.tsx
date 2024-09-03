import { Zekr } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import ZekrCart from '../constants/ZekrCart';
import ZekrFilterSection from '../module/ZekrFilterSection';

const Zekrpage = ({zekrs , Years}:any) => {

    return (
        <div className=" container mt-5 md:mt-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <h1 className=" font-bold md:text-2xl text-lg">ذکر ها</h1>
                    <p className="text-justify mt-3 indent-3" >در این صفحه آرشیوی از ذکرهای سقایی قرار گرفته است که هر ساله در هیئت عباسیه جولان خوانده می‌شوند. این اذکار با شور و خلوص خاصی در مراسم‌های مذهبی توسط مداحان و ذاکران اهل بیت (ع) اجرا می‌شوند. هدف از ایجاد این آرشیو، حفظ و انتقال این اذکار ارزشمند و ایجاد فرصت برای علاقه‌مندان به اذکار دینی و معنوی است. در اینجا می‌توانید به متن کامل اذکار به همراه توضیحات دسترسی داشته باشید.</p>
                </div>
                <div className="mt-6" >
                    <h1 className=" font-bold md:text-2xl text-lg">لیست ذکر ها</h1>
                    <ZekrFilterSection Years={Years} />
                    <div className="my-6" >{
                            zekrs.length ? <div className="flex flex-wrap gap-4 justify-center ">{
                                zekrs.map( (zr : Zekr , index : number) => <ZekrCart
                                                                                                key={index} 
                                                                                                zekr={zr}/> )
                                }</div> 
                                : <div className="flex items-center justify-center" >
                                    <p className="font-bold text-primary-red-3" >متاسفانه ذکری یافت نشد!</p>
                                </div>
                        
                    }</div>
                </div>
            </div>
        </div>
    );
};

export default Zekrpage;