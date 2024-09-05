import React from 'react';
import TrustesCart from '../constants/TrustesCart';
import { TRUSTEES_PERSONE } from '@/types/types';

const TrusstesPage = ({Trustees}:any) => {
    return (
        <div className=" container mt-5 md:mt-8 ">
        <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
            <div>
                <h1 className=" font-bold md:text-2xl text-lg">هیئت امنا</h1>
                <p className="text-justify mt-3 indent-3" >در این بخش از سایت، اعضای محترم هیئت امنای هیئت سقایی عباسیه جولان به همراه مسئولیت‌های آنان معرفی شده‌اند. هیئت امنا نقش کلیدی در اداره و هماهنگی فعالیت‌های هیئت دارد و با هدف حفظ ارزش‌های مذهبی و ترویج فرهنگ اهل بیت (ع)، فعالیت می‌کنند. هر یک از اعضا مسئولیت خاصی بر عهده دارند تا فعالیت‌های مذهبی و معنوی هیئت به بهترین نحو ممکن انجام شود.</p>
            </div>
            <div className="mt-6" >
                <h1 className=" font-bold md:text-2xl text-lg">لیست هیئت امنا</h1>
                <div className="my-6" >{
                        Trustees.length ? <div className="flex flex-wrap gap-4 justify-center ">{
                            Trustees.map( (trs : TRUSTEES_PERSONE , index: number)  => (<TrustesCart key={index} trs={JSON.stringify(trs)} />) ) 
                            }</div> 
                            : <div className="flex items-center justify-center" >
                                <p className="font-bold text-primary-red-3" >متاسفانه عضوی یافت نشد!</p>
                            </div>
                    
                }</div>
            </div>
        </div>
    </div>
    );
};

export default TrusstesPage;