import Link from "next/link";
import DeleteCeremonyButton from "../elements/DeleteCeremonyButton";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Slider from "@/module/Slider";
import { formatJalaliLong } from '@/utils/jalali';


const CeremonyDetailsPage = ({ceremony , admin}:any) => {

    const data = JSON.parse(ceremony)

    const { title , description , images , _id , date } = data;

    const route = admin ? "/admin-panel/ceremony" : "/ceromony"
    // Jalali date in Tehran time (avoids the previous UTC day-shift).
    const shamDATE = formatJalaliLong(date)

    return (
        <article className={admin ? "p-5 md:p-8" : "shell page"}>
            <div className="mx-auto max-w-4xl">
                <nav aria-label="مسیر" className="mb-6">
                    <Link className='link-arrow text-sm' href={ route }>مراسم‌ها<MdOutlineKeyboardArrowLeft aria-hidden /></Link>
                </nav>
                <header className="mb-8 grid gap-3">
                    <time className='text-sm font-semibold text-brass nums'>{shamDATE}</time>
                    <h1 className="page-title">{title}</h1>
                </header>
                <Slider images={images} title={title} />
                <div className="mt-10 border-t border-line pt-8">
                    <p className="prose-fa" >{description}</p>
                </div>
                {
                    admin ? <div className='mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-line pt-6'>
                        <Link href={`/admin-panel/ceremony/edit/${_id}`} className="btn btn-primary btn-sm">ویرایش مراسم</Link>
                        <DeleteCeremonyButton admin={true} _id={_id} />
                    </div> : null
                }
            </div>
        </article>
    );
};

export default CeremonyDetailsPage;
