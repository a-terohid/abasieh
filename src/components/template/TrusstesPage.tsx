import React from 'react';
import TrustesCart from '../constants/TrustesCart';
import { TRUSTEES_PERSONE } from '@/types/types';
import { TRUSTEES_ROLE } from '@/types/enums';

// Grouped by the three existing roles (already sorted by role on the server).
const GROUPS = [
    { role: TRUSTEES_ROLE.BOSS, title: TRUSTEES_ROLE.BOSS },
    { role: TRUSTEES_ROLE.NORMAL, title: "اعضای هیئت امنا" },
    { role: TRUSTEES_ROLE.PLUS, title: "اعضای علی‌البدل" },
];

const TrusstesPage = ({Trustees}:any) => {
    const known = new Set<string>(GROUPS.map(g => g.role));
    const groups = [
        ...GROUPS.map(g => ({ ...g, people: Trustees.filter((t: TRUSTEES_PERSONE) => t.role === g.role) })),
        { role: "other", title: "سایر اعضا", people: Trustees.filter((t: TRUSTEES_PERSONE) => !known.has(t.role)) },
    ].filter(g => g.people.length);

    return (
        <div className="shell page">
            <header className="page-header">
                <span className="eyebrow">دربارهٔ هیئت</span>
                <h1 className="page-title">هیئت امنا</h1>
                <p className="lead" >در این بخش از سایت، اعضای محترم هیئت امنای هیئت سقایی عباسیه جولان به همراه مسئولیت‌های آنان معرفی شده‌اند. هیئت امنا نقش کلیدی در اداره و هماهنگی فعالیت‌های هیئت دارد و با هدف حفظ ارزش‌های مذهبی و ترویج فرهنگ اهل بیت (ع)، فعالیت می‌کنند. هر یک از اعضا مسئولیت خاصی بر عهده دارند تا فعالیت‌های مذهبی و معنوی هیئت به بهترین نحو ممکن انجام شود.</p>
            </header>
            {
                groups.length ? <div className="grid gap-12">
                    { groups.map(g => (
                        <section key={g.role} aria-labelledby={`role-${g.role}`}>
                            <h2 id={`role-${g.role}`} className="section-title flex items-center gap-3">
                                {g.title}
                                <span className="h-px flex-1 bg-line" aria-hidden />
                            </h2>
                            <ul className={`grid gap-4 grid-cols-2 sm:gap-5 ${g.role === TRUSTEES_ROLE.BOSS ? "sm:grid-cols-3 lg:grid-cols-4" : "sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}`}>
                                { g.people.map( (trs : TRUSTEES_PERSONE , index: number)  => (<li key={trs._id ?? index}><TrustesCart trs={JSON.stringify(trs)} /></li>) ) }
                            </ul>
                        </section>
                    )) }
                </div>
                : <p className="empty" >متاسفانه عضوی یافت نشد!</p>
            }
        </div>
    );
};

export default TrusstesPage;
