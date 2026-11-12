import { Ceremony } from '@/types/types';
import React from 'react';
import CeremonyCard from '../constants/CeremonyCard';
import YearFilter from '../module/YearFilter';
import { toPersianDigits } from '@/utils/jalali';

const CeremonyPage = ({ceremonies, years = [], activeYear = ""}:any) => {
    return (
        <div>
            {/* Tekyeh: a quiet night band for ceremony / mourning content */}
            <header className="band-night">
                <div className="shell grid gap-4 py-12 lg:py-16">
                    <span className="eyebrow">گزارش مراسم</span>
                    <h1 className="page-title max-w-[24ch]">مراسم‌های هیئت سقایی عباسیه جولان</h1>
                    <div className="grid max-w-[68ch] gap-3 text-[0.9375rem] leading-8 text-night-muted md:text-base">
                        <p>در این بخش می‌توانید مراسم‌های متنوع و مهم برگزار شده توسط هیئت سقایی عباسیه جولان را مشاهده کنید. این مراسم‌ها شامل یادبودهای مذهبی، رویدادهای روحانی و مجالس دعا و ذکر است. هر یک از مراسم‌ها با هدف تقویت ارتباط معنوی و دینی برگزار شده و شما می‌توانید اطلاعات دقیق‌تری از جمله تاریخ، مکان برگزاری، سخنرانان و موضوعات ذکر شده در هر رویداد را مشاهده کنید.</p>
                        <p>با کلیک بر روی هر مراسم، می‌توانید جزئیات کامل آن شامل تصاویر و محتوای مرتبط را مطالعه کرده و با آیین‌های سنتی و فرهنگی هیئت بیشتر آشنا شوید. این مجموعه برای علاقه‌مندان به مسائل دینی و کسانی که به دنبال افزایش معرفت معنوی خود هستند، بسیار مفید خواهد بود.</p>
                    </div>
                </div>
            </header>
            <section className="shell page" aria-labelledby="ceremony-list">
                <div className="mb-6 grid gap-4">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h2 id="ceremony-list" className="section-title !mb-0">لیست مراسم‌ها</h2>
                        <p className="text-sm text-ink-subtle nums" aria-live="polite">{toPersianDigits(ceremonies.length)} مراسم</p>
                    </div>
                    <YearFilter years={years} active={activeYear} basePath="/ceromony" label="سال برگزاری (هجری شمسی)" />
                </div>
                {
                    ceremonies.length ? <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{
                        ceremonies.map( (cr: Ceremony , index : number) => (<li key={index}><CeremonyCard ceremony={cr} /></li>) )
                    }</ul>
                    : <p className="empty" >متاسفانه مراسمی یافت نشد!</p>
                }
            </section>
        </div>
    );
};

export default CeremonyPage;

