"use client"

import { useEffect, useState } from "react";

const ZekrtextSection = ({text}:any) => {
    const { FirstParagraph, SecondParagraph } = text ;

    const [ Section , setSection ] = useState("first")
    const sectionHandler = () => Section === "first" ? setSection("second") : setSection("first")

    const  [paragraph , setParagraph] = useState(FirstParagraph)

    useEffect(()=>{
        if (Section === "first") {
            setParagraph(FirstParagraph)
        } else {
            setParagraph(SecondParagraph)
        }
    }, [Section])

    const { Description , hadith , Zekr_text_p} = paragraph ;

    return (
        <div>
            <div className="flex items-center justify-center gap-x-3 text-xs md:text-sm" >
                <p onClick={sectionHandler} className={` ${ Section === "first" ? "bg-primary-red-2" : "bg-primary-red-3"} text-white rounded-xl w-fit py-2 px-3  cursor-pointer`} >بند اول</p>
                <p onClick={sectionHandler} className={` ${ Section === "second" ? "bg-primary-red-2" : "bg-primary-red-3"} text-white rounded-xl w-fit py-2 px-3  cursor-pointer`} >بند دوم</p>
            </div>
            <div className="mt-4 flex flex-col items-center justify-center" >
                <p className="text-sm font-bold text-right" >{Description}</p>
                <div className="bg-[#f6f6f6] w-full sm:w-2/3 md:w-[400px] sm:max-w-[400px] dark:bg-background-light-2 px-3 py-4 rounded-lg my-4 text-text-light flex flex-col gap-y-2">
                    {
                        Zekr_text_p.map((zp: string , index:number) =><p key={index} className="even:text-left text-sm font-bold dark:text-background-dark-1">{zp}</p>)
                    }
                </div>
                <p className="text-sm font-bold text-right">{hadith}</p>
            </div>
        </div>
    );
};

export default ZekrtextSection;