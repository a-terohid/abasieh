import { Ziartnameh_text_part } from '@/types/types';
import React from 'react';
import ZiartnamehTextCard from '../constants/ZiartnamehTextCard';
import Link from 'next/link';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DeleteZiartnamehButton from '../elements/DeleteZiartnamehButton';


const ZiartnamehDetailsPage = ({data, admin}:any) => {

    const { Title , Description, Voice , Text , _id } = data;

    const route = admin ? "/admin-panel/ziartnameh" : "/ziartnameh"

    return (
        <div className=" container my-5 md:my-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <div className='flex flex-row items-center justify-between'>
                        <h1 className=" font-bold md:text-2xl text-lg">{Title}</h1>
                        <Link className='flex items-center cursor-pointer w-fit hover:text-primary-red-4 text-primary-red-3 ' href={ route }>زیارت نامه ها<MdOutlineKeyboardArrowLeft/></Link>
                    </div>
                    <p className="text-justify mt-3 indent-3" >{Description}</p>
                </div>
                {
                    Voice ? <div className='mt-7' >
                        <h2 className=" font-bold md:text-2xl text-lg">فایل صوتی {Title}:</h2>
                        <div className='flex items-center justify-center mt-7' >
                            <audio src={`/uploads/voices/${Voice}`} controls />
                        </div>
                    </div> : null
                }
                <div className='mt-7'>
                    <h1 className=" font-bold md:text-2xl text-lg">متن زیارت نامه:</h1>
                    <div className='flex flex-col gap-y-7 divide-y  divide-gray-300 dark:divide-background-dark-5' >
                        {
                            Text?.map( (text: Ziartnameh_text_part , index: number) => <ZiartnamehTextCard key={index} text={text} index={index} />)
                        }
                    </div>
                </div>
                {
                    admin ? <div className='mt-6 flex gap-x-3 items-center justify-center'>
                        <DeleteZiartnamehButton admin={true} _id={_id} />
                        <Link href={`/admin-panel/ziartnameh/edit/${_id}`} className=" bg-primary-green-1 text-white rounded w-fit py-2 px-3 text-sm cursor-pointer">ویرایش زیارت نامه</Link>
                    </div> : null
                }
            </div>
        </div>
    );
};

export default ZiartnamehDetailsPage;