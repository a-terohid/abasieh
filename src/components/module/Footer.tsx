import Link from 'next/link';

import { FaTelegram } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import Eita from '@/public/img/Eita.png'
import BrandMark from './BrandMark';

const QUICK_LINKS = [
    { href: "/zekr", label: "ذکرها" },
    { href: "/ziartnameh", label: "زیارت‌نامه‌ها" },
    { href: "/ceromony", label: "مراسم‌ها" },
    { href: "/oldSlaves", label: "پیرغلامان" },
    { href: "/trustess", label: "هیئت امنا" },
    { href: "/donate", label: "کمک به هیئت" },
    { href: "/contactus", label: "ارتباط با ما" },
];

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-line bg-surface">
            <div className="tile-rule" aria-hidden />
            <div className='shell grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-14' >
                <section className='md:col-span-2 lg:col-span-5' aria-labelledby="footer-about">
                    <div className='flex items-center gap-3'>
                        <BrandMark className="h-10 w-9 text-accent" />
                        <h2 id="footer-about" className='text-lg font-extrabold' >هیئت سقایی عباسیه جولان</h2>
                    </div>
                    {/* Replaces the previous Lorem-ipsum placeholder with existing copy from the donate page. */}
                    <p className='mt-4 max-w-[52ch] text-[0.9375rem] leading-8 text-ink-muted' >هیئت سقایی عباسیه جولان با تلاش و همت اعضا و پشتیبانی‌های مردمی توانسته است یکی از پررنگ‌ترین نقش‌ها را در برگزاری مراسم‌های مذهبی و اجتماعی ایفا کند.</p>
                </section>

                <nav className='lg:col-span-3' aria-labelledby="footer-links">
                    <h2 id="footer-links" className='mb-4 text-sm font-bold text-ink-subtle' >دسترسی سریع</h2>
                    <ul className='grid grid-cols-2 gap-x-4'>
                        { QUICK_LINKS.map(l => (
                            <li key={l.href}><Link href={l.href} className='inline-flex min-h-10 items-center text-[0.9375rem] text-ink-muted transition-colors hover:text-accent-ink'>{l.label}</Link></li>
                        )) }
                    </ul>
                </nav>

                <section className='lg:col-span-4' aria-labelledby="footer-social">
                    <h2 id="footer-social" className='mb-2 text-sm font-bold text-ink-subtle' >ارتباط با ما</h2>
                    <p className='mb-4 text-[0.9375rem] leading-7 text-ink-muted' >ما را در شبکه‌های اجتماعی دنبال کنید و از آخرین اخبار و بروزرسانی‌ها مطلع شوید.</p>
                    <ul className='flex flex-wrap gap-2'>
                        <li><Link target='_blank' href="/" className="btn btn-secondary btn-sm"><img className='h-4 w-4' src={Eita.src} alt="" />ایتا</Link></li>
                        <li><Link target='_blank' href="https://www.instagram.com/abbasie_julan/" className="btn btn-secondary btn-sm"><AiFillInstagram aria-hidden className="text-base text-accent" />اینستاگرام</Link></li>
                        <li><Link target='_blank' href="https://t.me/abbasie_julan" className="btn btn-secondary btn-sm"><FaTelegram aria-hidden className="text-base text-accent" />تلگرام</Link></li>
                    </ul>
                </section>
            </div>
            <div className='border-t border-line'>
                <p className='shell py-5 text-center text-xs text-ink-subtle'>هیئت سقایی عباسیه جولان — همدان</p>
            </div>
        </footer>
    );
};

export default Footer;
