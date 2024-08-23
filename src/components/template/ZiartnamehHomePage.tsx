import { Ziartnameh } from "@/types/types";
import ZiartnamehCard from "../constants/ZiartnamehCard";

const ZiartnamehHomePage = ({ziartnameh} : any ) => {    

    return (
        <div className=" container mt-5 md:mt-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <h1 className=" font-bold md:text-2xl text-lg">زیارت‌نامه‌ها</h1>
                    <p className="text-justify mt-3 indent-3" >در این بخش از وبسایت، مجموعه‌ای از زیارت‌نامه‌های معتبر و مستند برای عاشقان اهل بیت (ع) فراهم شده است. هدف ما ایجاد فضایی است که شما بتوانید به سادگی و در هر زمان به این متون نورانی دسترسی پیدا کنید و لحظات خود را با یاد امامان معصوم (ع) معنوی سازید.</p>
                </div>
                <div className="mt-6" >
                    <h1 className=" font-bold md:text-2xl text-lg">لیست زیارت نامه ها</h1>
                    <div className="my-6" >{
                            ziartnameh.length ? <div className="flex flex-wrap gap-4 justify-center ">{
                                    ziartnameh.map( (zr : Ziartnameh , index : number) => <ZiartnamehCard 
                                                                                                key={index} 
                                                                                                ziartnameh={zr}/> )
                                }</div> 
                                : <div className="flex items-center justify-center" >
                                    <p className="font-bold text-primary-red-3" >متاسفانه زیارت نامه ای یافت نشد!</p>
                                </div>
                        
                    }</div>
                </div>
            </div>
        </div>
    );
};

export default ZiartnamehHomePage;