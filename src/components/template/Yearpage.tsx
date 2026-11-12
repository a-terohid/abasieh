import { ERROR } from '@/types/enums';
import Link from 'next/link';
import React from 'react';
import DeleteYearButton from '../elements/DeleteYearButton';

const Yearpage = ({Years}:any) => {
    

    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >سال ها</h1>
                <Link href="/admin-panel/year/add" className="btn btn-primary btn-sm" >افزودن سال</Link>
            </div>
            <div className="mt-6 flex flex-wrap gap-2" >
                {   
                    Years.length ? 
                    Years?.map( (year : String , index: number)  => <div key={index} className="list-row !gap-1 !py-1 !pe-1 w-fit nums">
                        <DeleteYearButton year={year} />
                        <p>{year}</p>
                    </div> ) 
                    : <p className='empty w-full'>{ERROR.NO_YEAR}</p>
                }
            </div>
        </div>
    );
};

export default Yearpage;
