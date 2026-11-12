import { User } from "@/types/types";
import Link from "next/link";
import AdminCart from "../constants/AdminCart";
import { ERROR } from "@/types/enums";


const AdminsPage = ({admins}: any) => {
    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >مدیر ها</h1>
                <Link href="/admin-panel/admins/add" className="btn btn-primary btn-sm" >افزودن ادمین</Link>
            </div>
            <div className="mt-6 grid gap-2" >
                {   
                    admins.length ? 
                        admins?.map( (admin : User , index: number)  => (<AdminCart key={index} admin={admin} />) ) 
                    : <p className="empty">{ERROR.NO_ADMIN}</p>
                }
            </div>
        </div>
    );
};

export default AdminsPage;
