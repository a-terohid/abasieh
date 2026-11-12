import React from 'react';
import { OLD_SLAVES } from '@/types/types';
import OldSlavesCart from '../constants/OldSlavesCart';

const OldSlavesPage = ({OldSlaves}:any) => {
    return (
        <div>
            <header className="band-night">
                <div className="shell grid justify-items-center gap-4 py-12 text-center lg:py-16">
                    <span className="eyebrow">به یاد</span>
                    <h1 className="page-title">پیرغلامان</h1>
                    <p className="max-w-[60ch] text-[0.9375rem] leading-8 text-night-muted md:text-base">در این بخش از سایت، نام، عکس و تاریخ فوت پیر غلامان هیئت سقایی عباسیه جولان نمایش داده شده است. این افراد در طول زندگی خود نقش‌های مهمی در هیئت داشته‌اند و یاد آن‌ها همیشه زنده خواهد ماند.</p>
                </div>
            </header>
            <section className="shell page" aria-labelledby="oldslaves-list">
                <h2 id="oldslaves-list" className="sr-only">لیست پیر غلامان</h2>
                {
                    OldSlaves.length ? <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{
                        OldSlaves.map( (OLS : OLD_SLAVES , index: number)  => (<li key={index}><OldSlavesCart OLS={JSON.stringify(OLS)} /></li>) ) 
                    }</ul>
                    : <p className="empty" >متاسفانه پیر غلامی یافت نشد!</p>
                }
            </section>
        </div>
    );
};

export default OldSlavesPage;

