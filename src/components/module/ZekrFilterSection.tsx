"use client"

import Link from "next/link";
import { useState } from "react";

const ZekrFilterSection = ({Years}:any) => {

    const [ Year , setYear ] = useState("")

    const changeHandler = ( event: any ) => setYear(event.target.value)
    

    return (
        <div className='mt-4' >
            <h3 className="font-bold">فیلتر:</h3>
            <div className="flex gap-x-3 text-xs md:text-sm items-center mt-2">
                <div className="flex flex-row gap-x-2 items-center">
                        <label>سال:</label>
                        <select name="Year" value={Year} onChange={changeHandler}
                            className="drop-shadow-md rounded text-Dark py-2 pr-3 w-fit bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1" >
                            <option value="انتخاب سال">انتخاب سال</option>
                            <hr />
                            {
                                Years.map((year:string, index:number) => (<option key={index} value={year} >{year}</option>))
                            }
                        </select>
                </div>
                <Link
                    href={{
                        pathname: "/zekr",
                        query: { year: Year !== "انتخاب سال" ? Year  :"" },
                    }}
                    className=" bg-primary-red-3 text-white rounded w-fit py-2 px-3  cursor-pointer" >اعمال</Link>
            </div>
        </div>
    );
};

export default ZekrFilterSection;