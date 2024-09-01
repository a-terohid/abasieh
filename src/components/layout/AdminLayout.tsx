import { adminLayoutProps } from "@/types/types";
import connectDB from "@/utils/connectDB";
import { authOptions } from "../lib/auth";
import { getServerSession } from "next-auth";
import USER from "@/models/user";
import { BsPersonCircle } from "react-icons/bs"
import { ROLE } from "@/types/enums";
import Link from "next/link";

const AdminLayout = async ({ children , role , email }: adminLayoutProps ) => {

    return (
        <div className=' container flex flex-col lg:flex-row lg:gap-x-8 lg:gap-y-0 gap-y-6 mt-6 pb-10 ' >
            <div className='flex overflow-auto gap-x-2 lg:flex-col lg:gap-y-3 h-fit lg:w-fit text-text-dark lg:min-w-[248px] py-2 lg:py-4 lg:px-4 rounded-xl shadow-xl bg-secondary-green-2' >
                <div className='lg:flex hidden flex-col items-center border-b-2 pb-3' >
                    <BsPersonCircle className=" text-4xl mb-2 " />
                    <p className=' mb-3' >{ email }</p>
                    { role == ROLE.ADMIN ? <p className=' px-2 font-bold bg-[#88d4ab] text-[#14746f] rounded-md'>admin</p> : null }
                    { role == ROLE.OWNER ? <p className=' px-2 font-bold bg-secondary-red-4 text-secondary-red-2 rounded-md' >owner</p> : null }
                </div>
                { role == ROLE.OWNER ? <Link className={ " w-fit px-3 py-1 rounded-lg text-sm lg:text-base flex gap-x-1 items-center whitespace-nowrap" } href="/admin-panel/admins" >مدیر ها</Link> : null }
                <Link className={ " w-fit px-3 py-1 rounded-lg text-sm lg:text-base flex gap-x-1 items-center whitespace-nowrap" } href="/admin-panel/ziartnameh" >زیارت‌ نامه ها</Link>
                <Link className={ " w-fit px-3 py-1 rounded-lg text-sm lg:text-base flex gap-x-1 items-center whitespace-nowrap" } href="/admin-panel/year" >سال ها</Link>
                <Link className={ " w-fit px-3 py-1 rounded-lg text-sm lg:text-base flex gap-x-1 items-center whitespace-nowrap" } href="/admin-panel/zekr" >ذکر ها</Link>
            </div>
            <div className='w-full rounded-xl shadow-xl bg-background-light-2 dark:bg-background-dark-5' >{ children }</div>
        </div>
    );
};

export default AdminLayout;