import Link from 'next/link';
import { FaRegEye } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import DeleteZekrButton from '../elements/DeleteZekrButton';

const ZekrAdminCart = ({zekr}:any) => {
    const { Title , _id} = zekr

    return (
        <div className="dark:bg-background-dark-3 bg-background-light-1 px-3 py-2 rounded-lg flex items-center justify-between" >
            <div className="flex items-center gap-x-3  overflow-hidden  text-ellipsis w-48 text-sm md:text-base">
                <h3>نام:</h3>
                <p className=''>{Title}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/zekr/${_id}`}><FaRegEye /></Link>
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/zekr/edit/${_id}`}><BiEdit /></Link>
                <span><DeleteZekrButton _id={ _id }   /></span>
            </div>
        </div>
    );
};

export default ZekrAdminCart;