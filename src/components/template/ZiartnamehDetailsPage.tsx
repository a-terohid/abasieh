import { Ziartnameh_text_part } from '@/types/types';
import React from 'react';
import ZiartnamehTextCard from '../constants/ZiartnamehTextCard';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DeleteZiartnamehButton from '../elements/DeleteZiartnamehButton';


const ZiartnamehDetailsPage = ({data, admin}:any) => {

    const { Title , Description, Voice , Text , _id } = data;

    const route = admin ? "/admin-panel/ziartnameh" : "/ziartnameh"

    return (
        <article className={admin ? "p-5 md:p-8" : "shell page"}>
            <div className="reader">
                <nav aria-label="مسیر" className="mb-6">
                    <Link className='link-arrow text-sm' href={ route }>زیارت‌نامه‌ها<MdOutlineKeyboardArrowLeft aria-hidden /></Link>
                </nav>
                <header className="grid gap-4 border-b border-line pb-6">
                    <span className="eyebrow">زیارت‌نامه</span>
                    <h1 className="page-title">{Title}</h1>
                    <p className="lead" >{Description}</p>
                </header>
                {
                    Voice ? <section className='mt-8 card p-4 sm:p-5' aria-label={`فایل صوتی ${Title}`} >
                        <h2 className="mb-3 text-sm font-bold text-ink-subtle">فایل صوتی</h2>
                        <audio className="w-full" src={`/uploads/voices/${Voice}`} controls preload="none" />
                    </section> : null
                }
                <section className='mt-10' aria-label="متن زیارت‌نامه">
                    <h2 className="section-title">متن زیارت‌نامه</h2>
                    <div className='verse-sheet divide-y divide-line !py-2' >
                        {
                            Text?.map( (text: Ziartnameh_text_part , index: number) => <ZiartnamehTextCard key={index} text={text} index={index} />)
                        }
                    </div>
                </section>
                {
                    admin ? <div className='mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-6'>
                        <Link href={`/admin-panel/ziartnameh/edit/${_id}`} className="btn btn-primary btn-sm">ویرایش زیارت‌نامه</Link>
                        <DeleteZiartnamehButton admin={true} _id={_id} />
                    </div> : null
                }
            </div>
        </article>
    );
};

export default ZiartnamehDetailsPage;
