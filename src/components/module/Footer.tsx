import Link from 'next/link';

import { FaInstagram } from "react-icons/fa6";
import { FaTelegram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { AiFillInstagram } from "react-icons/ai";
import Eita from '@/public/Eita.png'



const Footer = () => {
    return (
        <footer className="bg-background-light-2 dark:bg-background-dark-2 py-9" >
            <div className=' container divide-y dark:divide-background-dark-5 divide-gray-300' >
                <section>
                    <h3 className='text-xl mb-2 font-bold text-primary-red-3 dark:text-secondary-red-2' >درباره ما</h3>
                    <p className='text-justify indent-4' >لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.</p>
                </section>
                <section className='mt-6 pt-6' >
                    <h3 className='text-xl mb-2 font-bold text-primary-red-3 dark:text-secondary-red-2' >ارتباط با ما</h3>
                    <p className='mb-3' >ما را در شبکه‌های اجتماعی دنبال کنید و از آخرین اخبار و بروزرسانی‌ها مطلع شوید.</p>
                    <ul>
                        <li><Link target='_blank' href="/"className="flex items-center gap-x-2 text-lg py-2"><img className='w-5' src={Eita.src}/>ایتا</Link></li>
                        <li><Link target='_blank' href="https://www.instagram.com/abbasie_julan/"className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><AiFillInstagram /></span>اینستاگرام</Link></li>
                        <li><Link target='_blank' href="https://t.me/abbasie_julan"className="flex items-center gap-x-2 text-lg py-2"><span className="text-primary-red-2"><FaTelegram /></span>تلگرام</Link></li>
                    </ul>
                </section>
            </div>
        </footer>
    );
};

export default Footer;