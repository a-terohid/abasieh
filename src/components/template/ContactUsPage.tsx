import Link from "next/link";
import { AiFillInstagram } from "react-icons/ai";
import { FaTelegram } from "react-icons/fa6";
import { MdOutlineCall, MdOutlineEmail, MdOutlinePlace, MdOutlineMap } from "react-icons/md";
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
        <div className="shell page">
            <header className="page-header">
                <span className="eyebrow">ارتباط</span>
                <h1 className="page-title">ارتباط با ما</h1>
                <div className="prose-fa">
                    <p>خدمتگزاران اهل بیت علیهم‌السلام در هیئت ما از حضور شما بزرگواران صمیمانه قدردانی می‌کنند. ارتباط شما با ما نشان از علاقه و ارادت قلبی به خاندان مطهر اهل‌بیت است، و ما مفتخریم که در این مسیر مقدس در کنار شما باشیم.</p>
                    <p>چنانچه سوال، نظر، یا درخواست خاصی دارید، لطفاً از طریق راه‌های ارتباطی زیر با ما در تماس باشید. حضور و همراهی شما برای ما مایه دلگرمی و تقویت فعالیت‌های معنوی هیئت است. در انتظار دریافت پیام‌های ارزشمند شما هستیم. باشد که این ارتباط، زمینه‌ساز توفیقات بیشتر در خدمت به اهل‌بیت علیهم‌السلام باشد.</p>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
                <div className="grid content-start gap-6 lg:col-span-5">
                    <section className="panel" aria-labelledby="contact-ways">
                        <h2 id="contact-ways" className="section-title">راه‌های ارتباطی</h2>
                        <p className="text-[0.9375rem] leading-8 text-ink-muted">برای ارتباط با هیئت و پاسخ به سوالات یا دریافت اطلاعات بیشتر، می‌توانید از راه‌های زیر با ما در تماس باشید:</p>
                        <dl className="mt-5 grid gap-4">
                            <div className="flex items-start gap-3">
                                <dt className="mt-1 text-lg text-accent"><MdOutlineCall aria-hidden /><span className="sr-only">شماره تماس</span></dt>
                                <dd><span className="block text-xs text-ink-subtle">شماره تماس</span><a href={`tel:${phone}`} dir="ltr" className="font-semibold nums hover:text-accent-ink">{phone}</a></dd>
                            </div>
                            <div className="flex items-start gap-3">
                                <dt className="mt-1 text-lg text-accent"><MdOutlineEmail aria-hidden /><span className="sr-only">ایمیل</span></dt>
                                <dd className="min-w-0"><span className="block text-xs text-ink-subtle">ایمیل</span><a href={`mailto:${email}`} dir="ltr" className="break-all font-semibold hover:text-accent-ink">{email}</a></dd>
                            </div>
                            <div className="flex items-start gap-3">
                                <dt className="mt-1 text-lg text-accent"><MdOutlinePlace aria-hidden /><span className="sr-only">آدرس</span></dt>
                                <dd><span className="block text-xs text-ink-subtle">آدرس</span><span className="font-semibold">{address}</span></dd>
                            </div>
                            <div className="flex items-start gap-3">
                                <dt className="mt-1 text-lg text-accent"><MdOutlineMap aria-hidden /><span className="sr-only">نقشه</span></dt>
                                <dd><span className="block text-xs text-ink-subtle">نقشه</span><a href={google} target="_blank" className="link">برای مشاهده بر روی نقشه، کلیک کنید!</a></dd>
                            </div>
                        </dl>
                        <p className="mt-5 border-t border-line pt-4 text-sm text-ink-subtle">تیم خدمتگزاران هیئت در اسرع وقت به پیام‌های شما پاسخ خواهند داد.</p>
                    </section>

                    <section className="panel" aria-labelledby="contact-social">
                        <h2 id="contact-social" className="section-title">شبکه‌های اجتماعی</h2>
                        <p className="text-[0.9375rem] leading-8 text-ink-muted">برای اطلاع از برنامه‌ها، اخبار و فعالیت‌های هیئت در فضای مجازی، ما را در شبکه‌های اجتماعی دنبال کنید</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                            <li><Link target='_blank' href="/" className="btn btn-secondary btn-sm"><img className='h-4 w-4' src={Eita.src} alt=""/>ایتا</Link></li>
                            <li><Link target='_blank' href="https://www.instagram.com/abbasie_julan/" className="btn btn-secondary btn-sm"><AiFillInstagram aria-hidden className="text-base text-accent" />اینستاگرام</Link></li>
                            <li><Link target='_blank' href="https://t.me/abbasie_julan" className="btn btn-secondary btn-sm"><FaTelegram aria-hidden className="text-base text-accent" />تلگرام</Link></li>
                        </ul>
                        <p className="mt-4 text-sm leading-7 text-ink-subtle">با دنبال کردن شبکه‌های اجتماعی هیئت، همیشه از جدیدترین برنامه‌ها و محافل معنوی باخبر خواهید شد. ما مشتاقانه منتظر همراهی شما در این مسیر نورانی هستیم.</p>
                    </section>
                </div>

                <section className="panel lg:col-span-7" aria-labelledby="contact-form">
                    <h2 id="contact-form" className="section-title">ارسال پیام</h2>
                    <ContactForm />
                </section>
            </div>
        </div>
    );
};

export default ContactUsPage;
