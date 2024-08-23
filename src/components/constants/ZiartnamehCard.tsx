import { ZiartnamehCardProps } from '@/types/types';
import Link from 'next/link';
import React from 'react';


const ZiartnamehCard: React.FC<ZiartnamehCardProps> = ({ ziartnameh }) => {
        
    const { Title , Description , _id } = ziartnameh

    return (
        <div className='px-5 py-4 dark:bg-background-dark-5 bg-background-light-1 rounded-lg w-72  bg-Dark text-f6  shadow-md ' >
            <div>
                <h2 className='font-bold text-secondary-red-3 md:text-lg'>{ Title }</h2>
                <div className=" flex flex-col gap-y-4 px-2 w-full mt-2 text-justify h-[150px]" >
                    <p className="flex gap-x-2 items-start text-xs indent-4  overflow-hidden  text-ellipsis  md:text-base" >{ Description }</p>
                </div>
                <div className='mt-3 text-xs md:text-base font-bold  '>
                    <Link className=' cursor-pointer text-secondary-red-4 hover:text-secondary-red-3 '  href={`/ziartnameh/${_id}`}>مشاهده زیارت نامه</Link>
                </div>
            </div>
        </div>
    );
};

export default ZiartnamehCard;