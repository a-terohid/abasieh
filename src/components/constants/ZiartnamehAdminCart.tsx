import Link from 'next/link';
import { FaRegEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import DeleteZiartnamehButton from '../elements/DeleteZiartnamehButton';

const ZiartnamehAdminCart = ({ziartnameh}:any) => {
    const { Title , _id} = ziartnameh

    return (
        <div className="list-row" >
            <p className="min-w-0 flex-1 truncate ps-2 text-[0.9375rem] font-semibold" title={Title}><span className="sr-only">نام: </span>{Title}</p>
            <div className="flex shrink-0 items-center gap-0.5">
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label="مشاهده" href={`/admin-panel/ziartnameh/${_id}`}><FaRegEye aria-hidden /></Link>
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label="ویرایش" href={`/admin-panel/ziartnameh/edit/${_id}`}><BiEdit aria-hidden /></Link>
                <span><DeleteZiartnamehButton _id={ _id }   /></span>
            </div>
        </div>
    );
};

export default ZiartnamehAdminCart;
