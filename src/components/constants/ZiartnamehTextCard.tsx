import { englishToPersianNumber } from '@/utils/englishToPersianNumber';
import React from 'react';

const ZiartnamehTextCard = ({text , index}:any) => {

    const { Original , Translation , Supplement ,  } = text

    return (
        <section id={`section-${index + 1}`} className='scroll-mt-24 py-8 first:pt-2' aria-label={`بخش ${index + 1}`}>
            <span className='badge badge-accent nums'>بخش {englishToPersianNumber(String(index+1))}</span>
            <div className='mt-5 grid gap-4'>
                { Supplement ? <p className='note'>{Supplement}</p> : null }
                <p lang="ar" dir="rtl" className='text-arabic'>{Original}</p>
                <p className='text-translation'>{Translation}</p>
            </div>
        </section>
    );
};

export default ZiartnamehTextCard;
