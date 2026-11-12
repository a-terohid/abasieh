import { englishToPersianNumber } from '@/utils/englishToPersianNumber';

import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DeleteZekrButton from "../elements/DeleteZekrButton";
import ZekrtextSection from "@/module/ZekrtextSection";


const ZekrDetailspage = ({zekr , admin}:any) => {

    const { Title , Year, Author, Voice , Zekr_Text , _id } = JSON.parse(zekr);

    const route = admin ? "/admin-panel/zekr" : "/zekr"

    return (
        <article className={admin ? "p-5 md:p-8" : "shell page"}>
            <div className="reader">
                <nav aria-label="مسیر" className="mb-6">
                    <Link className='link-arrow text-sm' href={ route }>ذکرها<MdOutlineKeyboardArrowLeft aria-hidden /></Link>
                </nav>
                <header className="grid gap-4 border-b border-line pb-6 text-center">
                    <span className="eyebrow justify-self-center">ذکر سقایی</span>
                    <h1 className="page-title">{Title}</h1>
                    <dl className="meta-list justify-center">
                        <div><dt>شاعر:</dt><dd>{Author}</dd></div>
                        <div><dt>سال:</dt><dd className="nums">{englishToPersianNumber(String(Year ?? ""))}</dd></div>
                    </dl>
                </header>
                {
                    Voice ? <section className='mt-8 card p-4 sm:p-5' aria-label={`فایل صوتی ${Title}`} >
                        <h2 className="mb-3 text-sm font-bold text-ink-subtle">فایل صوتی</h2>
                        <audio className="w-full" src={`/uploads/voices/${Voice}`} controls preload="none" />
                    </section> : null
                }
                <section className='mt-10' aria-label="متن ذکر">
                    <ZekrtextSection text={Zekr_Text} />
                </section>
                {
                    admin ? <div className='mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-6'>
                        <Link href={`/admin-panel/zekr/edit/${_id}`} className="btn btn-primary btn-sm">ویرایش ذکر</Link>
                        <DeleteZekrButton admin={true} _id={_id} />
                    </div> : null
                }
            </div>
        </article>
    );
};

export default ZekrDetailspage;
