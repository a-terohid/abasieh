import { Ziartnameh } from "@/types/types";
import ZiartnamehCard from "../constants/ZiartnamehCard";

const ZiartnamehHomePage = ({ziartnameh} : any ) => {    

    return (
        <div className="shell page">
            <header className="page-header">
                <span className="eyebrow">زیارات و ادعیه</span>
                <h1 className="page-title">زیارت‌نامه‌ها</h1>
                <p className="lead" >در این بخش از وبسایت، مجموعه‌ای از زیارت‌نامه‌های معتبر و مستند برای عاشقان اهل بیت (ع) فراهم شده است. هدف ما ایجاد فضایی است که شما بتوانید به سادگی و در هر زمان به این متون نورانی دسترسی پیدا کنید و لحظات خود را با یاد امامان معصوم (ع) معنوی سازید.</p>
            </header>
            <section aria-labelledby="ziyarat-list">
                <h2 id="ziyarat-list" className="section-title">لیست زیارت‌نامه‌ها</h2>
                {
                    ziartnameh.length ? <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{
                        ziartnameh.map( (zr : Ziartnameh , index : number) => <li key={index}><ZiartnamehCard ziartnameh={zr}/></li> )
                    }</ul>
                    : <p className="empty" >متاسفانه زیارت نامه ای یافت نشد!</p>
                }
            </section>
        </div>
    );
};

export default ZiartnamehHomePage;
