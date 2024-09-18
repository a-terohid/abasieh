import { englishToPersianNumber } from '@/utils/englishToPersianNumber';
import { persianToFinglish } from '@/utils/prTOen';
import jalaali from 'jalaali-js';
import Link from 'next/link';

const CeremonyCard = ({ceremony}:any) => {

    const { title , coverImage, description , date , _id } = ceremony
    
    const enTitle = persianToFinglish( title ).replace(/[^a-z0-9]/gi, '_').toLowerCase(); 

    const DATE = new Date(date);
    const year = DATE.getUTCFullYear();
    const month = DATE.getUTCMonth() + 1;
    const day = DATE.getUTCDate();

    const jalaliDate = jalaali.toJalaali(new Date(year, month - 1, day));
    const shamDATE = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`
    
    return (
        <div className='px-4 py-5 bg-background-light-1 text-text-light rounded-xl shadow'>
            <div>
                <img className='w-80 h-52 rounded-xl shadow-lg ' src={`uploads/images/cermony/${enTitle}/${coverImage}`} alt={title} />
            </div>
            <div className='mt-4'>
                <h1 className='font-bold lg:text-lg' >{title}</h1>
                <h3 className='text-xs mt-1 mb-2 text-primary-red-2 font-bold'>{englishToPersianNumber(shamDATE)}</h3>
                <div className=" flex flex-col gap-y-4 w-80 text-justify h-[80px] text-sm" >
                    <p className="flex gap-x-2 items-start text-xs indent-2  overflow-hidden  text-ellipsis  md:text-base " >{ description }</p>
                </div>
                <div className='flex items-end justify-end mt-3' >
                    <Link className='font-bold text-sm cursor-pointer text-primary-red-2 '  href={`/ceromony/${_id}`} >مشاهده</Link>
                </div>
            </div>
        </div>
    );
};

export default CeremonyCard;