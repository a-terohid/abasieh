import Link from 'next/link';
import React from 'react';

const ZekrCart = ({zekr}:any) => {
    const { Title , Year , _id } = zekr

    return (
        <div className='px-5 py-4 dark:bg-background-dark-5 bg-background-light-1 rounded-lg w-72  bg-Dark text-f6  shadow-md ' >
            <div>
                <h2 className='font-bold text-secondary-red-3 md:text-lg'>{ Title }</h2>
                <div className=" flex flex-col gap-y-4 px-2 w-full mt-2 text-justify" >
                    <p className="flex gap-x-2 items-start text-xs  md:text-base" >سال:{ Year }</p>
                </div>
                <div className='mt-3 text-xs md:text-sm font-bold  '>
                    <Link className=' cursor-pointer text-secondary-red-4 hover:text-secondary-red-3 '  href={`/zekr/${_id}`}>مشاهده ذکر</Link>
                </div>
            </div>
        </div>
    );

}

export default ZekrCart;