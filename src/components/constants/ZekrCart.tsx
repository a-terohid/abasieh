import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FiHeadphones } from 'react-icons/fi';
import { toPersianDigits } from '@/utils/jalali';

// Saqaei zekr card — identity: the verse itself. Shows the opening hemistich pair of the
// first stanza (existing data), with year and poet as quiet metadata.
const ZekrCart = ({zekr}:any) => {
    const { Title , Year , _id, Author, Voice, Zekr_Text } = zekr
    const opening: string[] = (Zekr_Text?.FirstParagraph?.Zekr_text_p ?? []).filter(Boolean).slice(0, 2);

    return (
        <article className='card card-interactive group relative flex h-full flex-col overflow-hidden' >
            <div className='h-1 bg-brass/70' aria-hidden />
            <div className='card-pad flex flex-1 flex-col gap-4'>
                <div className='card-kicker'>
                    <span className='badge badge-brass nums'>{ Year ? `سال ${toPersianDigits(Year)}` : "ذکر سقایی" }</span>
                    { Author ? <><span className='dot-sep' aria-hidden /><span>{Author}</span></> : null }
                </div>
                <h3 className='text-lg font-bold leading-8 text-ink'>
                    <Link href={`/zekr/${_id}`} className='stretched-link outline-none group-hover:text-accent-ink'>{ Title }</Link>
                </h3>
                { opening.length ? (
                    <div className='rounded-xl bg-surface-2 px-4 py-3' aria-label="آغاز ذکر">
                        <p className='line-clamp-1 font-semibold leading-8 text-ink-muted'>{opening[0]}</p>
                        { opening[1] ? <p className='line-clamp-1 text-end font-semibold leading-8 text-ink-muted'>{opening[1]}</p> : null }
                    </div>
                ) : null }
                <div className='card-footer'>
                    <span className='flex items-center gap-1.5'>{ Voice ? <><FiHeadphones aria-hidden className='text-accent' />دارای فایل صوتی</> : null }</span>
                    <span className='link-arrow'>مشاهده ذکر<MdOutlineKeyboardArrowLeft aria-hidden className='text-lg transition-transform group-hover:-translate-x-0.5' /></span>
                </div>
            </div>
        </article>
    );

}

export default ZekrCart;
