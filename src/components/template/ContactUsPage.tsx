import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa6";
import Eita from '@/public/img/Eita.png'
import ContactForm from "@/module/ContactForm";

const ContactUsPage = () => {

    const data = {
        phone: "09019451381",
        email: "abasiehjoulan@gmail.com",
        google: "https://maps.app.goo.gl/ACYU6NNXf1Q6M2WW6",
        address: "همدان همدان خیابان شهدا خیابان جولان"
    }

    const { phone , email , google , address } = data

    return (
        <div className=" container mt-5 md:mt-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <h1 className=" font-bold md:text-2xl text-lg">ارتباط باما</h1>
                    <p className="text-justify mt-3" >خدمتگزاران اهل بیت علیهم‌السلام در هیئت ما از حضور شما بزرگواران صمیمانه قدردانی می‌کنند. ارتباط شما با ما نشان از علاقه و ارادت قلبی به خاندان مطهر اهل‌بیت است، و ما مفتخریم که در این مسیر مقدس در کنار شما باشیم.</p>
                    <p className="text-justify mt-3 indent-3" >چنانچه سوال، نظر، یا درخواست خاصی دارید، لطفاً از طریق راه‌های ارتباطی زیر با ما در تماس باشید. حضور و همراهی شما برای ما مایه دلگرمی و تقویت فعالیت‌های معنوی هیئت است. در انتظار دریافت پیام‌های ارزشمند شما هستیم. باشد که این ارتباط، زمینه‌ساز توفیقات بیشتر در خدمت به اهل‌بیت علیهم‌السلام باشد.</p>
                </div>
                <div className="mt-6" >
                    <h1 className="mb-2 font-bold md:text-2xl text-lg">راه های ارتباطی</h1>
                    <p>برای ارتباط با هیئت و پاسخ به سوالات یا دریافت اطلاعات بیشتر، می‌توانید از راه‌های زیر با ما در تماس باشید:</p>
                    <div className="my-4 mr-4 flex flex-col gap-y-3" >
                        <p className="font-bold flex  gap-x-2" >شماره تماس: <span className="font-normal">{phone}</span></p>
                        <p className="font-bold flex  gap-x-2" > ایمل: <a className="font-normal">{email}</a></p>
                        <p className="font-bold flex  gap-x-2" > آدرس: <span className="font-normal">{address}</span></p>
                        <p className="font-bold flex  gap-x-2" > نقشه: <a href={google} target="_blank" className="font-normal text-primary-red-2">برای مشاهده بر روی نقشه،  کلیک کنید!</a></p>
                    </div>
                    <p>تیم خدمتگزاران هیئت در اسرع وقت به پیام‌های شما پاسخ خواهند داد.</p>
                </div>
                <div className="mt-6" >
                    <h1 className="mb-2 font-bold md:text-2xl text-lg">شبکه‌های اجتماعی</h1>
                    <p>برای اطلاع از برنامه‌ها، اخبار و فعالیت‌های هیئت در فضای مجازی، ما را در شبکه‌های اجتماعی دنبال کنید</p>
                    <div className="my-4 mr-4 flex flex-col gap-y-3" >
                        <ul>
                            <li><Link target='_blank' href="/"className="flex items-center gap-x-2 text-lg py-2"><img className='w-5' src={Eita.src}/>ایتا</Link></li>
                            <li><Link target='_blank' href="https://www.instagram.com/abbasie_julan/"className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><AiFillInstagram /></span>اینستاگرام</Link></li>
                            <li><Link target='_blank' href="https://t.me/abbasie_julan"className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><FaTelegram /></span>تلگرام</Link></li>
                        </ul>
                    </div>
                    <p>با دنبال کردن شبکه‌های اجتماعی هیئت، همیشه از جدیدترین برنامه‌ها و محافل معنوی باخبر خواهید شد. ما مشتاقانه منتظر همراهی شما در این مسیر نورانی هستیم.</p>
                </div>
                <div className="mt-6" >
                    <h1 className="mb-2 font-bold md:text-2xl text-lg">ارسال پیام</h1>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
};

export default ContactUsPage;