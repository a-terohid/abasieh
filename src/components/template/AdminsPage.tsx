import { User } from "@/types/types";
import Link from "next/link";
import AdminCart from "../constants/AdminCart";
import { ERROR } from "@/types/enums";


const AdminsPage = ({admins}: any) => {
    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >ادمین ها:</h1>
                <Link href="/admin-panel/admins/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن ادمین</Link>
            </div>
            <div className="flex flex-col gap-y-2 mt-4" >
                {   
                    admins.length ? 
                        admins?.map( (admin : User , index: number)  => (<AdminCart key={index} admin={admin} />) ) 
                    : <p>{ERROR.NO_ADMIN}</p>
                }
            </div>
        </div>
    );
};

export default AdminsPage;