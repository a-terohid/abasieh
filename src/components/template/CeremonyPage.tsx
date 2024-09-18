import { Ceremony } from '@/types/types';
import React from 'react';
import CeremonyCard from '../constants/CeremonyCard';

const CeremonyPage = ({ceremonies}:any) => {
    return (
        <div className=" container mt-5 md:mt-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <h1 className=" font-bold md:text-2xl text-lg">مراسم‌های هیئت سقایی عباسیه جولان</h1>
                    <p className="text-justify mt-3 indent-3" >در این بخش می‌توانید مراسم‌های متنوع و مهم برگزار شده توسط هیئت سقایی عباسیه جولان را مشاهده کنید. این مراسم‌ها شامل یادبودهای مذهبی، رویدادهای روحانی و مجالس دعا و ذکر است. هر یک از مراسم‌ها با هدف تقویت ارتباط معنوی و دینی برگزار شده و شما می‌توانید اطلاعات دقیق‌تری از جمله تاریخ، مکان برگزاری، سخنرانان و موضوعات ذکر شده در هر رویداد را مشاهده کنید.</p>
                    <p className="text-justify mt-3 indent-3" >با کلیک بر روی هر مراسم، می‌توانید جزئیات کامل آن شامل تصاویر و محتوای مرتبط را مطالعه کرده و با آیین‌های سنتی و فرهنگی هیئت بیشتر آشنا شوید. این مجموعه برای علاقه‌مندان به مسائل دینی و کسانی که به دنبال افزایش معرفت معنوی خود هستند، بسیار مفید خواهد بود.</p>
                </div>
                <div className="mt-6" >
                    <h1 className=" font-bold md:text-2xl text-lg">لیست مراسم ها</h1>
                    <div className="my-6" >{
                            ceremonies.length ? <div className="flex flex-wrap gap-4 justify-center ">{
                                ceremonies.map( (cr: Ceremony , index : number) => (<CeremonyCard key={index} ceremony={cr} />) )
                                }</div> 
                                : <div className="flex items-center justify-center" >
                                    <p className="font-bold text-primary-red-3" >متاسفانه مراسمی یافت نشد!</p>
                                </div>
                        
                    }</div>
                </div>
            </div>
        </div>
    );
};

export default CeremonyPage;