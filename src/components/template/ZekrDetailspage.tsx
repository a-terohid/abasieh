
import Link from "next/link";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import DeleteZekrButton from "../elements/DeleteZekrButton";
import { useState } from "react";
import ZekrtextSection from "@/module/ZekrtextSection";


const ZekrDetailspage = ({zekr , admin}:any) => {

    const { Title , Year, Author, Voice , Zekr_Text , _id } = JSON.parse(zekr);

    const route = admin ? "/admin-panel/zekr" : "/zekr"

    return (
        <div className=" container my-5 md:my-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <div className='flex flex-row items-center justify-between'>
                        <h1 className=" font-bold md:text-2xl text-lg">{Title}</h1>
                        <Link className='flex items-center cursor-pointer w-fit hover:text-primary-red-4 text-primary-red-3 ' href={ route }>ذکر ها<MdOutlineKeyboardArrowLeft/></Link>
                    </div>
                    <p className="mt-3 font-bold " >شاعر: <span className="font-normal mr-2">{Author}</span></p>
                    <p className="mt-3 font-bold " >سال: <span className="font-normal mr-2">{Year}</span></p>
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
                    <h1 className=" font-bold md:text-2xl text-lg">متن ذکر:</h1>
                    <ZekrtextSection text={Zekr_Text} />
                </div>
                {
                    admin ? <div className='mt-6 flex gap-x-3 items-center justify-center'>
                        <DeleteZekrButton admin={true} _id={_id} />
                        <Link href={`/admin-panel/zekr/edit/${_id}`} className=" bg-primary-green-1 text-white rounded w-fit py-2 px-3 text-sm cursor-pointer">ویرایش ذکر</Link>
                    </div> : null
                }
            </div>
        </div>
    );
};

export default ZekrDetailspage;