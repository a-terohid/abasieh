import React from 'react';

const DonatePage = () => {

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
                    <h1 className=" font-bold md:text-2xl text-lg">کمک به هیئت سقایی عباسیه جولان</h1>
                    <p className="text-justify mt-3 indent-3" >هیئت سقایی عباسیه جولان با تلاش و همت اعضا و پشتیبانی‌های مردمی توانسته است یکی از پررنگ‌ترین نقش‌ها را در برگزاری مراسم‌های مذهبی و اجتماعی ایفا کند. حمایت شما از این هیئت می‌تواند به بهبود و توسعه برنامه‌ها و فعالیت‌های ما کمک کند و ما را قادر سازد که در مسیر اهداف مذهبی و اجتماعی خود گام برداریم.</p>
                </div>
                <div className='mt-5'>
                    <h1 className=" font-bold md:text-2xl text-lg">چرا کمک به هیئت مهم است؟</h1>
                    <p className="text-justify mt-3 indent-3" >هیئت‌های مذهبی در فرهنگ اسلامی نقشی اساسی در برگزاری مراسم‌های دینی، کمک به نیازمندان، و حفظ ارزش‌های اسلامی دارند. هیئت سقایی عباسیه جولان نیز با تلاش بی‌وقفه و حمایت‌های شما، فعالیت‌های دینی و اجتماعی خود را گسترش داده است. هر نوع کمکی، چه مالی و چه غیرمالی، می‌تواند تأثیر بزرگی در پیشبرد برنامه‌های هیئت داشته باشد.</p>
                </div>
                <div className='mt-5'>
                    <h1 className=" font-bold md:text-2xl text-lg">روش‌های کمک مالی</h1>
                    <p className="text-justify mt-3 indent-3" >برای کمک مالی به هیئت سقایی عباسیه جولان، می‌توانید از روش‌های زیر استفاده کنید. کمک‌های مالی شما به ما امکان می‌دهد تا هزینه‌های مختلف مربوط به برگزاری مراسم‌ها، نذورات، و سایر فعالیت‌های هیئت را تامین کنیم:</p>
                    <ol className='mt-3 font-bold list-decimal mr-9 flex flex-col gap-y-3 '>
                        <li>انتقال وجه از طریق شماره:</li>
                        <li>شماره شبا:</li>
                        <li>کمک‌های نقدی در مراسم‌های هیئت</li>
                    </ol>
                </div>
                <div className='mt-5'>
                    <h1 className=" font-bold md:text-2xl text-lg">کمک‌های غیرمالی</h1>
                    <p className="text-justify mt-3 indent-3" >علاوه بر کمک‌های مالی، شما می‌توانید با ارائه خدمات و یا کالاهای مورد نیاز، به هیئت کمک کنید. این خدمات شامل موارد زیر است:</p>
                    <ol className='mt-3 mr-9 font-bold flex list-disc flex-col gap-y-3 '>
                        <li>پشتیبانی از توزیع نذورات و غذا در مراسم‌ها</li>
                        <li>کمک در برنامه‌ریزی و برگزاری مراسم‌های هیئت</li>
                        <li>طراحی و تبلیغ در شبکه‌های اجتماعی هیئت</li>
                    </ol>
                </div>
                <div className='mt-5'>
                    <p className="text-justify mt-5 indent-3" >از تمامی عزیزانی که تاکنون با کمک‌های مالی و غیرمالی خود ما را یاری کرده‌اند، صمیمانه سپاسگزاریم. بدون حمایت‌های شما، ادامه فعالیت‌های ما ممکن نبود و حضور شما باعث شده است که مراسم‌های مذهبی و فعالیت‌های اجتماعی با شکوه بیشتری برگزار شود.</p>
                </div>
                <div className="mt-6" >
                    <h1 className="mb-2 font-bold md:text-2xl text-lg">راه های ارتباطی</h1>
                    <div className="my-4 mr-4 flex flex-col gap-y-3" >
                        <p className="font-bold flex  gap-x-2" >شماره تماس: <span className="font-normal">{phone}</span></p>
                        <p className="font-bold flex  gap-x-2" > ایمل: <a className="font-normal">{email}</a></p>
                        <p className="font-bold flex  gap-x-2" > آدرس: <span className="font-normal">{address}</span></p>
                        <p className="font-bold flex  gap-x-2" > نقشه: <a href={google} target="_blank" className="font-normal text-primary-red-2">برای مشاهده بر روی نقشه،  کلیک کنید!</a></p>
                    </div>
            </div>
            </div>
        </div>
    );
}
export default DonatePage;