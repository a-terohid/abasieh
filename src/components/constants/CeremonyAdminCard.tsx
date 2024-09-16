import Link from 'next/link';
import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { FaRegEye } from 'react-icons/fa';

const CeremonyAdminCard = ({ceremony}:any) => {

    const { title , _id} = ceremony

    return (
        <div className="dark:bg-background-dark-3 bg-background-light-1 px-3 py-2 rounded-lg flex items-center justify-between" >
            <div className="flex items-center gap-x-3 text-sm md:text-base">
                <h3>نام:</h3>
                <p>{title}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/ceremony/${_id}`}><FaRegEye /></Link>
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/ceremony/edit/${_id}`}><BiEdit /></Link>
                {/* <span><DeleteZiartnamehButton _id={ _id }   /></span> */}
            </div>
        </div>
    );
};

export default CeremonyAdminCard;