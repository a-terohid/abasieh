"use client"

import { useEffect, useState } from "react";

const ZekrtextSection = ({text}:any) => {
    const { FirstParagraph, SecondParagraph } = text ;

    const [ Section , setSection ] = useState("first")

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
            <div className="flex justify-center">
                <div className="segmented" role="tablist" aria-label="بندهای ذکر">
                    <button type="button" role="tab" aria-selected={Section === "first"} aria-controls="zekr-band" onClick={() => setSection("first")}>بند اول</button>
                    <button type="button" role="tab" aria-selected={Section === "second"} aria-controls="zekr-band" onClick={() => setSection("second")}>بند دوم</button>
                </div>
            </div>
            <div id="zekr-band" role="tabpanel" className="mt-8 grid gap-6" >
                { Description ? <p className="prose-fa mx-auto text-center" >{Description}</p> : null }
                <div className="verse-sheet">
                    <div className="hemistichs">
                        {
                            Zekr_text_p.map((zp: string , index:number) =><p key={index} className="hemistich">{zp}</p>)
                        }
                    </div>
                </div>
                { hadith ? (
                    <blockquote className="mx-auto max-w-[60ch] text-center">
                        <p className="text-arabic !text-xl">{hadith}</p>
                    </blockquote>
                ) : null }
            </div>
        </div>
    );
};

export default ZekrtextSection;
