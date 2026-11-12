"use client"

import { useState, useEffect } from 'react';
import profile from "@/public/img/profile.png";
import { checkImageExists } from '@/utils/checkIMG';
import { mask } from '@/utils/mask';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import DeleteTrustessButton from '../elements/DeleteTrustessButton';
import { TRUSTEES_ROLE } from '@/types/enums';

// Board member card — identity: a dignified portrait with the official role.
// The chair gets a brass frame; other roles share the same calm card.
const TrustesCart = ({ trs , admin }: any) => {
    const { fullName, phone, role, img, _id } = JSON.parse(trs);

    // No filename → use the placeholder directly instead of requesting the folder URL.
    const IMG_SRC = img ? `/uploads/images/Trustees/${img}` : profile.src;
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

    const isBoss = role === TRUSTEES_ROLE.BOSS;

    return (
        <article className={`card flex h-full flex-col overflow-hidden ${isBoss ? "border-brass/50" : ""}`} >
            <div className={`p-3 ${isBoss ? "bg-brass-soft" : "bg-surface-2"}`}>
                <div className='aspect-[4/5] overflow-hidden rounded-xl bg-surface-3'>
                    <img className='h-full w-full object-cover text-[0px]' src={imageSrc} alt={fullName} loading="lazy" />
                </div>
            </div>
            <div className='flex flex-1 flex-col items-center gap-2 px-4 pb-5 pt-4 text-center' >
                <h3 className='text-base font-bold leading-7 sm:text-lg' >{fullName}</h3>
                <span className={`badge ${isBoss ? "badge-brass" : ""}`}>{role}</span>
                { phone ? <p dir="ltr" className='mt-auto pt-2 text-sm text-ink-subtle nums'>{mask( phone , "****-***-****" )}</p> : null }
            </div>
            {
                admin ? <div className="flex items-center justify-center gap-1 border-t border-line px-3 py-2">
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label={`ویرایش ${fullName}`} href={`/admin-panel/trustees/edit/${_id}`}><BiEdit aria-hidden /></Link>
                <span><DeleteTrustessButton _id={ _id }   /></span>
            </div> : null
            }
        </article>
    );
};

export default TrustesCart;
