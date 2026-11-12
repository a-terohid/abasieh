import Link from 'next/link'
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md'
import { GoNote } from 'react-icons/go'
import { FiBookOpen } from 'react-icons/fi'
import { FaPeopleGroup } from 'react-icons/fa6'
import { TbMoneybag } from 'react-icons/tb'
import { MdOutlineCall } from 'react-icons/md'
import BrandMark from '@/module/BrandMark'

// Static composition built only from copy that already exists on the site's pages.
// No data fetching is added here (see docs/context: recent reports/featured texts need a product decision).

const READING = [
    {
        href: "/zekr",
        icon: GoNote,
        eyebrow: "ذکرهای سقایی",
        title: "ذکرها",
        text: "آرشیوی از ذکرهای سقایی که هر ساله در هیئت عباسیه جولان خوانده می‌شوند؛ به همراه متن کامل و توضیحات.",
        cta: "مشاهده ذکرها",
    },
    {
        href: "/ziartnameh",
        icon: FiBookOpen,
        eyebrow: "زیارات و ادعیه",
        title: "زیارت‌نامه‌ها",
        text: "مجموعه‌ای از زیارت‌نامه‌های معتبر و مستند برای عاشقان اهل بیت (ع)، تا به سادگی و در هر زمان به این متون نورانی دسترسی داشته باشید.",
        cta: "مشاهده زیارت‌نامه‌ها",
    },
];

const MORE = [
    { href: "/trustess", icon: FaPeopleGroup, title: "هیئت امنا", text: "هیئت امنا نقش کلیدی در اداره و هماهنگی فعالیت‌های هیئت دارد." },
    { href: "/donate", icon: TbMoneybag, title: "کمک به هیئت", text: "حمایت شما می‌تواند به بهبود و توسعه برنامه‌ها و فعالیت‌های هیئت کمک کند." },
    { href: "/contactus", icon: MdOutlineCall, title: "ارتباط با ما", text: "چنانچه سوال، نظر، یا درخواست خاصی دارید، با ما در تماس باشید." },
];

const page = () => {
    return (
        <>
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-line">
                <div className="shell grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
                    <div className="grid gap-5 lg:col-span-7">
                        <span className="eyebrow">همدان</span>
                        <h1 className="text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-extrabold leading-[1.3]">
                            هیئت سقایی
                            <span className="block text-accent-ink">عباسیه جولان</span>
                        </h1>
                        <p className="lead">هیئت سقایی عباسیه جولان با تلاش و همت اعضا و پشتیبانی‌های مردمی توانسته است یکی از پررنگ‌ترین نقش‌ها را در برگزاری مراسم‌های مذهبی و اجتماعی ایفا کند.</p>
                        <div className="mt-2 flex flex-wrap gap-3">
                            <Link href="/zekr" className="btn btn-primary">ذکرهای سقایی</Link>
                            <Link href="/ziartnameh" className="btn btn-secondary">زیارت‌نامه‌ها</Link>
                        </div>
                    </div>

                    {/* Saqakhaneh niche: the site's visual signature (no imagery is invented). */}
                    <div className="hidden justify-center sm:flex lg:col-span-5" aria-hidden>
                        <div className="niche relative grid aspect-[4/5] w-full max-w-[19rem] place-items-center border border-line bg-night p-8">
                            <div className="niche absolute inset-4 border border-brass/40" />
                            <div className="niche absolute inset-9 border border-accent/30" />
                            <BrandMark className="relative h-28 w-24 text-accent" />
                            <div className="absolute inset-x-10 bottom-10 h-px bg-brass/50" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Reading */}
            <section className="shell py-14 lg:py-20" aria-labelledby="home-texts">
                <div className="mb-8 grid gap-2">
                    <span className="eyebrow">متون</span>
                    <h2 id="home-texts" className="page-title !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">ذکر و زیارت</h2>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                    {READING.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link key={item.href} href={item.href} className="card card-interactive group grid gap-5 p-6 md:p-8">
                                <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-2xl text-accent-ink"><Icon aria-hidden /></span>
                                <div className="grid gap-2">
                                    <span className="text-sm font-semibold text-brass">{item.eyebrow}</span>
                                    <h3 className="text-2xl font-extrabold group-hover:text-accent-ink">{item.title}</h3>
                                    <p className="max-w-[48ch] leading-8 text-ink-muted">{item.text}</p>
                                </div>
                                <span className="link-arrow">{item.cta}<MdOutlineKeyboardArrowLeft aria-hidden className="text-lg transition-transform group-hover:-translate-x-0.5" /></span>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Memory — Tekyeh band */}
            <section className="band-night" aria-labelledby="home-memory">
                <div className="shell grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
                    <div className="grid content-start gap-3 lg:col-span-4">
                        <span className="eyebrow">یاد و خاطره</span>
                        <h2 id="home-memory" className="page-title !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">مراسم‌ها و پیرغلامان</h2>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                        <Link href="/ceromony" className="group grid gap-3 rounded-2xl border border-white/10 bg-night-2 p-6 transition-colors hover:border-brass/50">
                            <h3 className="text-xl font-bold text-night-ink">مراسم‌ها</h3>
                            <p className="leading-8 text-night-muted">مراسم‌های متنوع و مهم برگزار شده توسط هیئت سقایی عباسیه جولان؛ شامل یادبودهای مذهبی، رویدادهای روحانی و مجالس دعا و ذکر.</p>
                            <span className="inline-flex items-center gap-1 font-semibold text-brass">مشاهده مراسم‌ها<MdOutlineKeyboardArrowLeft aria-hidden className="text-lg" /></span>
                        </Link>
                        <Link href="/oldSlaves" className="group grid gap-3 rounded-2xl border border-white/10 bg-night-2 p-6 transition-colors hover:border-brass/50">
                            <h3 className="text-xl font-bold text-night-ink">پیرغلامان</h3>
                            <p className="leading-8 text-night-muted">این افراد در طول زندگی خود نقش‌های مهمی در هیئت داشته‌اند و یاد آن‌ها همیشه زنده خواهد ماند.</p>
                            <span className="inline-flex items-center gap-1 font-semibold text-brass">مشاهده پیرغلامان<MdOutlineKeyboardArrowLeft aria-hidden className="text-lg" /></span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* The Heyat */}
            <section className="shell py-14 lg:py-20" aria-labelledby="home-heyat">
                <div className="mb-8 grid gap-2">
                    <span className="eyebrow">هیئت</span>
                    <h2 id="home-heyat" className="page-title !text-[clamp(1.5rem,1.2rem+1vw,2rem)]">همراهی با هیئت</h2>
                </div>
                <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
                    {MORE.map(item => {
                        const Icon = item.icon;
                        return (
                            <li key={item.href}>
                                <article className="card card-interactive group relative flex h-full flex-col gap-3 card-pad">
                                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brass-soft text-xl text-brass"><Icon aria-hidden /></span>
                                    <h3 className="text-lg font-bold">
                                        <Link href={item.href} className="stretched-link outline-none group-hover:text-accent-ink">{item.title}</Link>
                                    </h3>
                                    <p className="text-[0.9375rem] leading-8 text-ink-muted">{item.text}</p>
                                    <span className="link-arrow mt-auto pt-1">ادامه<MdOutlineKeyboardArrowLeft aria-hidden className="text-lg transition-transform group-hover:-translate-x-0.5" /></span>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </section>
        </>
    );
};

export default page;
