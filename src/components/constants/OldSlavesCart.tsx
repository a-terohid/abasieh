"use client"

import { useState, useEffect } from 'react';
import profile from "@/public/img/profile.png";
import { checkImageExists } from '@/utils/checkIMG';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import { formatJalaliLong } from '@/utils/jalali';
import DeleteOldSlavesButton from '../elements/DeleteOldSlavesButton';

const OldSlavesCart = ({ OLS , admin }: any) => {
    const { fullName, date , img, _id } = JSON.parse(OLS);

    // No filename → use the placeholder directly instead of requesting the folder URL.
    const IMG_SRC = img ? `/uploads/images/oldSlaves/${img}` : profile.src;
    const [imageSrc, setImageSrc] = useState(IMG_SRC);

    useEffect(() => {
        const checkImage = async () => {
            if (IMG_SRC === profile.src) return;
            const exists = await checkImageExists(IMG_SRC);
            if (!exists) {
                setImageSrc(profile.src);
            }
        };

        checkImage();
    }, [IMG_SRC]);
    // Jalali date in Tehran time (avoids the previous UTC day-shift).
    const shamDATE = formatJalaliLong(date)

    return (
        <article className='flex h-full flex-col items-center text-center' >
            {/* Memorial portrait: muted, no hover effects. */}
            <div className='niche aspect-[4/5] w-full max-w-[11rem] overflow-hidden border border-line bg-surface-2'>
                <img className='h-full w-full object-cover text-[0px] grayscale-[65%] sepia-[15%]' src={imageSrc} alt={fullName} loading="lazy" />
            </div>
            <div className='mt-4 grid justify-items-center gap-1' >
                <h3 className='text-base font-bold leading-7' >{fullName}</h3>
                <p className='text-sm text-ink-subtle'><span>تاریخ وفات: </span><span className='nums'>{shamDATE}</span></p>
            </div>
            {
                admin ? <div className="mt-3 flex items-center justify-center gap-1">
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label={`ویرایش ${fullName}`} href={`/admin-panel/oldSlaves/edit/${_id}`}><BiEdit aria-hidden /></Link>
                <span><DeleteOldSlavesButton _id={ _id }   /></span>
            </div> : null
            }
        </article>
    );
};

export default OldSlavesCart;
