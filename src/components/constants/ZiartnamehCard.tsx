import { ZiartnamehCardProps } from '@/types/types';
import Link from 'next/link';
import React from 'react';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FiHeadphones } from 'react-icons/fi';
import { toPersianDigits } from '@/utils/jalali';

// Ziyarat card — identity: the Arabic text. Opens with the first Arabic section in Naskh.
const ZiartnamehCard: React.FC<ZiartnamehCardProps> = ({ ziartnameh }) => {
        
    const { Title , Description , _id, Text, Voice } = ziartnameh as any
    const arabic: string = Text?.[0]?.Original ?? "";
    const sections: number = Array.isArray(Text) ? Text.length : 0;

    return (
        <article className='card card-interactive group relative flex h-full flex-col overflow-hidden' >
            { arabic ? (
                <div className='border-b border-line bg-accent-soft/60 px-5 py-4 sm:px-6'>
                    <p lang="ar" dir="rtl" className='line-clamp-2 font-arabic text-xl leading-[2.1] text-accent-ink'>{arabic}</p>
                </div>
            ) : <div className='h-1 bg-accent/70' aria-hidden /> }
            <div className='card-pad flex flex-1 flex-col gap-3'>
                <h3 className='text-lg font-bold leading-8 text-ink'>
                    <Link href={`/ziartnameh/${_id}`} className='stretched-link outline-none group-hover:text-accent-ink'>{ Title }</Link>
                </h3>
                { Description ? <p className="line-clamp-3 text-[0.9375rem] leading-8 text-ink-muted" >{ Description }</p> : null }
                <div className='card-footer'>
                    <span className='card-kicker'>
                        { sections ? <span className='nums'>{toPersianDigits(sections)} بخش</span> : null }
                        { sections && Voice ? <span className='dot-sep' aria-hidden /> : null }
                        { Voice ? <span className='flex items-center gap-1.5'><FiHeadphones aria-hidden className='text-accent' />صوت</span> : null }
                    </span>
                    <span className='link-arrow'>مشاهده<MdOutlineKeyboardArrowLeft aria-hidden className='text-lg transition-transform group-hover:-translate-x-0.5' /></span>
                </div>
            </div>
        </article>
    );
};

export default ZiartnamehCard;
