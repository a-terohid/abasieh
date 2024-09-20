"use client"

import { useState, useEffect } from 'react';
import profile from "@/public/img/profile.png";
import { checkImageExists } from '@/utils/checkIMG';
import Link from 'next/link';
import { BiEdit } from 'react-icons/bi';
import jalaali from 'jalaali-js';
import DeleteOldSlavesButton from '../elements/DeleteOldSlavesButton';
import { englishToPersianNumber } from '@/utils/englishToPersianNumber';

const OldSlavesCart = ({ OLS , admin }: any) => {
    const { fullName, date , img, _id } = JSON.parse(OLS);

    const IMG_SRC = `/uploads/images/oldSlaves/${img}`;
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


    const DATE = new Date(date);
    const year = DATE.getUTCFullYear();
    const month = DATE.getUTCMonth() + 1;
    const day = DATE.getUTCDate();

    const jalaliDate = jalaali.toJalaali(new Date(year, month - 1, day));
    const shamDATE = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`

    return (
        <div className='px-4 py-5 bg-background-light-1 text-text-light rounded-xl shadow' >
            <div>
                <img className='w-52 h-52 rounded-xl shadow-lg'  src={imageSrc} alt={fullName} />
            </div>
            <div className='mt-4 flex flex-col items-center justify-center gap-y-2' >
                <h1 className='font-bold' >{fullName}</h1>
                <p className='flex gap-x-2'><span>تاریخ وفات: </span>{englishToPersianNumber(shamDATE)}</p>
            </div>
            {
                admin ? <div className="flex gap-x-2 mt-4 text-lg justify-center items-center">
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/oldSlaves/edit/${_id}`}><BiEdit /></Link>
                <span><DeleteOldSlavesButton _id={ _id }   /></span>
            </div> : null
            }
        </div>
    );
};

export default OldSlavesCart;