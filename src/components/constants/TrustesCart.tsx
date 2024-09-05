"use client"

import { useState, useEffect } from 'react';
import profile from "@/public/img/profile.png";
import { checkImageExists } from '@/utils/checkIMG';
import { mask } from '@/utils/mask';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import DeleteTrustessButton from '../elements/DeleteTrustessButton';

const TrustesCart = ({ trs , admin }: any) => {
    const { fullName, phone, role, img, _id } = JSON.parse(trs);

    const IMG_SRC = `/uploads/images/Trustees/${img}`;
    const [imageSrc, setImageSrc] = useState(IMG_SRC);

    useEffect(() => {
        const checkImage = async () => {
            const exists = await checkImageExists(IMG_SRC);
            if (!exists) {
                setImageSrc(profile.src);
            }
        };

        checkImage();
    }, [IMG_SRC]);

    return (
        <div className='px-4 py-5 bg-background-light-1 text-text-light rounded-xl shadow' >
            <div>
                <img className='w-52 h-52 rounded-xl shadow-lg'  src={imageSrc} alt={fullName} />
            </div>
            <div className='mt-4 flex flex-col items-center justify-center gap-y-2' >
                <h1 className='font-bold' >{fullName}</h1>
                <p>{role}</p>
                <p>{mask( phone , "****-***-****" )}</p>
            </div>
            {
                admin ? <div className="flex gap-x-2 mt-4 text-lg justify-center items-center">
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/trustees/edit/${_id}`}><BiEdit /></Link>
                <span><DeleteTrustessButton _id={ _id }   /></span>
            </div> : null
            }
        </div>
    );
};

export default TrustesCart;