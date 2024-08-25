import React from 'react';

const ZiartnamehTextCard = ({text , index}:any) => {

    const { Original , Translation , Supplement ,  } = text

    return (
        <div id={index} className='pt-7'>
            <span className='text-xs text-text-dark px-2 py-1 bg-primary-red-3 rounded-2xl'>بخش {index+1}:</span>
            <div className='mt-4'>
                <p className='font-bold italic my-2 text-primary-green-2'>{Supplement}</p>
                <p className='font-bold mb-3'>{Original}</p>
                <p>{Translation}</p>
            </div>
        </div>
    );
};

export default ZiartnamehTextCard;