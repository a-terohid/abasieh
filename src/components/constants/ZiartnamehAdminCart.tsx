
import Link from "next/link";
import DeleteZiartnamehButton from "../elements/DeleteZiartnamehButton";
import { FaRegEye } from "react-icons/fa";



const ZiartnamehAdminCart = ({ziartnameh}: any) => {

    const { Title , _id} = ziartnameh

    return (
        <div className="dark:bg-background-dark-3 bg-background-light-1 px-3 py-2 rounded-lg flex items-center justify-between" >
            <div className="flex items-center gap-x-3 text-sm md:text-base">
                <h3>نام:</h3>
                <p>{Title}</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <Link className=" cursor-pointer text-primary-green-2 dark:text-primary-green-4 " href={`/admin-panel/ziartnameh/${_id}`}><FaRegEye /></Link>
                <span><DeleteZiartnamehButton _id={ _id }   /></span>
            </div>
        </div>
    );
};

export default ZiartnamehAdminCart;