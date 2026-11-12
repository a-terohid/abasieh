import { formatJalaliLong } from '@/utils/jalali';
import { persianToFinglish } from '@/utils/prTOen';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { FiImage } from 'react-icons/fi';
import { toPersianDigits } from '@/utils/jalali';

// Ceremony report card — identity: the photograph, with the Jalali date on it.
const CeremonyCard = ({ceremony}:any) => {

    const { title , coverImage, description , date , _id, images } = ceremony
    
    const enTitle = persianToFinglish( title ).replace(/[^a-z0-9]/gi, '_').toLowerCase(); 

    // Jalali date in Tehran time (avoids the previous UTC day-shift).
    const shamDATE = formatJalaliLong(date)
    const photos = Array.isArray(images) ? images.length : 0;
    
    return (
        <article className='card card-interactive group relative flex h-full flex-col overflow-hidden'>
            <div className='relative aspect-[3/2] overflow-hidden bg-surface-2'>
                {/* Path kept as in the original implementation (relative URL); see docs for E-23. */}
                <img className='h-full w-full object-cover text-[0px] transition-transform duration-500 group-hover:scale-[1.03]' src={`uploads/images/cermony/${enTitle}/cover/${coverImage}`} alt="" loading="lazy" />
                <div className='absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-night/60 to-transparent' aria-hidden />
                { shamDATE ? <time dateTime={date} className='absolute bottom-3 start-3 rounded-full bg-night/80 px-3 py-1 text-xs font-semibold text-night-ink backdrop-blur-sm'>{shamDATE}</time> : null }
            </div>
            <div className='card-pad flex flex-1 flex-col gap-2'>
                <h3 className='text-lg font-bold leading-8 text-ink' >
                    <Link href={`/ceromony/${_id}`} className='stretched-link outline-none group-hover:text-accent-ink'>{title}</Link>
                </h3>
                <p className="line-clamp-3 text-[0.9375rem] leading-8 text-ink-muted" >{ description }</p>
                <div className='card-footer'>
                    <span className='flex items-center gap-1.5 nums'>{ photos ? <><FiImage aria-hidden className='text-brass' />{toPersianDigits(photos)} تصویر</> : null }</span>
                    <span className='link-arrow'>مشاهده گزارش<MdOutlineKeyboardArrowLeft aria-hidden className='text-lg' /></span>
                </div>
            </div>
        </article>
    );
};

export default CeremonyCard;
