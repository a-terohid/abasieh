import Link from "next/link";
import DeleteCeremonyButton from "../elements/DeleteCeremonyButton";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Slider from "@/module/Slider";
import jalaali from 'jalaali-js';
import { englishToPersianNumber } from "@/utils/englishToPersianNumber";


const CeremonyDetailsPage = ({ceremony , admin}:any) => {

    const data = JSON.parse(ceremony)

    const { title , description , images , _id , date } = data;

    const route = admin ? "/admin-panel/ceremony" : "/ceromony"

    const DATE = new Date(date);
    const year = DATE.getUTCFullYear();
    const month = DATE.getUTCMonth() + 1;
    const day = DATE.getUTCDate();

    const jalaliDate = jalaali.toJalaali(new Date(year, month - 1, day));
    const shamDATE = `${jalaliDate.jy}/${jalaliDate.jm}/${jalaliDate.jd}`

    return (
        <div className=" container my-5 md:my-8 ">
            <div className="bg-background-light-2 dark:bg-background-dark-2  rounded-lg py-4 lg:py-6 px-5 lg:px-8" >
                <div>
                    <div className='flex flex-row items-end mb-5 justify-end'>
                        <Link className='flex items-center cursor-pointer w-fit hover:text-primary-red-4 text-primary-red-3 ' href={ route }> مراسم ها<MdOutlineKeyboardArrowLeft/></Link>
                    </div>
                    <Slider images={images} title={title} />
                    <h1 className=" font-bold md:text-2xl mt-8 mb-4 text-lg">{title}</h1>
                    <h3 className='text-xs lg:text-sm mt-1 mb-2 text-primary-red-2 font-bold'>{englishToPersianNumber(shamDATE)}</h3>
                    <p className="text-justify mt-3 indent-3" >{description}</p>
                </div>
                {
                    admin ? <div className='mt-6 flex gap-x-3 items-center justify-center'>
                        <DeleteCeremonyButton admin={true} _id={_id} />
                        <Link href={`/admin-panel/ceremony/edit/${_id}`} className=" bg-primary-green-1 text-white rounded w-fit py-2 px-3 text-sm cursor-pointer">ویرایش مراسم</Link>
                    </div> : null
                }
            </div>
        </div>
    );
};

export default CeremonyDetailsPage;