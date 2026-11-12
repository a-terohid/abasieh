import React from 'react';
import { MdOutlineCall, MdOutlineEmail, MdOutlinePlace, MdOutlineMap } from "react-icons/md";

const DonatePage = () => {

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
                <span className="eyebrow">حمایت از هیئت</span>
                <h1 className="page-title">کمک به هیئت سقایی عباسیه جولان</h1>
                <p className="lead" >هیئت سقایی عباسیه جولان با تلاش و همت اعضا و پشتیبانی‌های مردمی توانسته است یکی از پررنگ‌ترین نقش‌ها را در برگزاری مراسم‌های مذهبی و اجتماعی ایفا کند. حمایت شما از این هیئت می‌تواند به بهبود و توسعه برنامه‌ها و فعالیت‌های ما کمک کند و ما را قادر سازد که در مسیر اهداف مذهبی و اجتماعی خود گام برداریم.</p>
            </header>

            <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                <div className="grid content-start gap-10 lg:col-span-7">
                    <section aria-labelledby="why">
                        <h2 id="why" className="section-title">چرا کمک به هیئت مهم است؟</h2>
                        <p className="prose-fa" >هیئت‌های مذهبی در فرهنگ اسلامی نقشی اساسی در برگزاری مراسم‌های دینی، کمک به نیازمندان، و حفظ ارزش‌های اسلامی دارند. هیئت سقایی عباسیه جولان نیز با تلاش بی‌وقفه و حمایت‌های شما، فعالیت‌های دینی و اجتماعی خود را گسترش داده است. هر نوع کمکی، چه مالی و چه غیرمالی، می‌تواند تأثیر بزرگی در پیشبرد برنامه‌های هیئت داشته باشد.</p>
                    </section>
                    <section aria-labelledby="financial">
                        <h2 id="financial" className="section-title">روش‌های کمک مالی</h2>
                        <p className="prose-fa" >برای کمک مالی به هیئت سقایی عباسیه جولان، می‌توانید از روش‌های زیر استفاده کنید. کمک‌های مالی شما به ما امکان می‌دهد تا هزینه‌های مختلف مربوط به برگزاری مراسم‌ها، نذورات، و سایر فعالیت‌های هیئت را تامین کنیم:</p>
                        {/* Account fields are empty in the source data; shown as-is (see docs: owner must supply details). */}
                        <ol className='mt-5 grid gap-3'>
                            <li className="list-row !py-3 font-semibold"><span className="flex items-center gap-3 ps-1"><span className="badge badge-accent nums">۱</span>انتقال وجه از طریق شماره:</span></li>
                            <li className="list-row !py-3 font-semibold"><span className="flex items-center gap-3 ps-1"><span className="badge badge-accent nums">۲</span>شماره شبا:</span></li>
                            <li className="list-row !py-3 font-semibold"><span className="flex items-center gap-3 ps-1"><span className="badge badge-accent nums">۳</span>کمک‌های نقدی در مراسم‌های هیئت</span></li>
                        </ol>
                    </section>
                    <section aria-labelledby="non-financial">
                        <h2 id="non-financial" className="section-title">کمک‌های غیرمالی</h2>
                        <p className="prose-fa" >علاوه بر کمک‌های مالی، شما می‌توانید با ارائه خدمات و یا کالاهای مورد نیاز، به هیئت کمک کنید. این خدمات شامل موارد زیر است:</p>
                        <ul className='mt-4 grid gap-2 ps-1'>
                            {["پشتیبانی از توزیع نذورات و غذا در مراسم‌ها","کمک در برنامه‌ریزی و برگزاری مراسم‌های هیئت","طراحی و تبلیغ در شبکه‌های اجتماعی هیئت"].map(t => (
                                <li key={t} className="flex items-start gap-3 font-semibold"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-brass" aria-hidden />{t}</li>
                            ))}
                        </ul>
                    </section>
                    <p className="prose-fa border-t border-line pt-6" >از تمامی عزیزانی که تاکنون با کمک‌های مالی و غیرمالی خود ما را یاری کرده‌اند، صمیمانه سپاسگزاریم. بدون حمایت‌های شما، ادامه فعالیت‌های ما ممکن نبود و حضور شما باعث شده است که مراسم‌های مذهبی و فعالیت‌های اجتماعی با شکوه بیشتری برگزار شود.</p>
                </div>

                <aside className="lg:col-span-5">
                    <section className="panel lg:sticky lg:top-24" aria-labelledby="donate-contact">
                        <h2 id="donate-contact" className="section-title">راه‌های ارتباطی</h2>
                        <dl className="grid gap-4">
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
                    </section>
                </aside>
            </div>
        </div>
    );
}
export default DonatePage;
