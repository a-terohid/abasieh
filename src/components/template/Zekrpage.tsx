import { Zekr } from '@/types/types';
import React from 'react';
import ZekrCart from '../constants/ZekrCart';
import ZekrFilterSection from '../module/ZekrFilterSection';
import { toPersianDigits } from '@/utils/jalali';

const Zekrpage = ({zekrs , Years, activeYear}:any) => {

    return (
        <div className="shell page">
            <header className="page-header">
                <span className="eyebrow">ذکرهای سقایی</span>
                <h1 className="page-title">ذکرها</h1>
                <p className="lead" >در این صفحه آرشیوی از ذکرهای سقایی قرار گرفته است که هر ساله در هیئت عباسیه جولان خوانده می‌شوند. این اذکار با شور و خلوص خاصی در مراسم‌های مذهبی توسط مداحان و ذاکران اهل بیت (ع) اجرا می‌شوند. هدف از ایجاد این آرشیو، حفظ و انتقال این اذکار ارزشمند و ایجاد فرصت برای علاقه‌مندان به اذکار دینی و معنوی است. در اینجا می‌توانید به متن کامل اذکار به همراه توضیحات دسترسی داشته باشید.</p>
            </header>
            <section aria-labelledby="zekr-list">
                <div className="mb-6 grid gap-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 id="zekr-list" className="section-title !mb-0">لیست ذکرها</h2>
                        <p className="text-sm text-ink-subtle nums" aria-live="polite">{toPersianDigits(zekrs.length)} ذکر</p>
                    </div>
                    <ZekrFilterSection Years={Years} activeYear={activeYear} />
                </div>
                {
                    zekrs.length ? <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">{
                        zekrs.map( (zr : Zekr , index : number) => <li key={index}><ZekrCart zekr={zr}/></li> )
                    }</ul>
                    : <p className="empty" >متاسفانه ذکری یافت نشد!</p>
                }
            </section>
        </div>
    );
};

export default Zekrpage;
