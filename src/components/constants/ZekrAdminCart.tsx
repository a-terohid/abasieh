import Link from 'next/link';
import { FaRegEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import DeleteZekrButton from '../elements/DeleteZekrButton';

const ZekrAdminCart = ({zekr}:any) => {
    const { Title , _id} = zekr

    return (
        <div className="list-row" >
            <p className="min-w-0 flex-1 truncate ps-2 text-[0.9375rem] font-semibold" title={Title}><span className="sr-only">نام: </span>{Title}</p>
            <div className="flex shrink-0 items-center gap-0.5">
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label="مشاهده" href={`/admin-panel/zekr/${_id}`}><FaRegEye aria-hidden /></Link>
                <Link className="icon-btn icon-btn-sm icon-btn-accent" aria-label="ویرایش" href={`/admin-panel/zekr/edit/${_id}`}><BiEdit aria-hidden /></Link>
                <span><DeleteZekrButton _id={ _id }   /></span>
            </div>
        </div>
    );
};

export default ZekrAdminCart;
