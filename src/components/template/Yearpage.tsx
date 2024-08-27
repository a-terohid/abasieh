import { ERROR } from '@/types/enums';
import Link from 'next/link';
import React from 'react';
import DeleteYearButton from '../elements/DeleteYearButton';

const Yearpage = ({Years}:any) => {
    

    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >سال ها:</h1>
                <Link href="/admin-panel/year/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن سال</Link>
            </div>
            <div className="flex gap-y-2 justify-end gap-x-3 mt-4" >
                {   
                    Years.length ? 
                    Years?.map( (year : String , index: number)  => <div key={index} className="dark:bg-background-dark-3 bg-background-light-1 gap-x-2 px-3 py-2 flex justify-center items-center rounded-lg w-fit">
                        <DeleteYearButton year={year} />
                        <p>{year}</p>
                    </div> ) 
                    : <p className='text-right w-full'>{ERROR.NO_YEAR}</p>
                }
            </div>
        </div>
    );
};

export default Yearpage;