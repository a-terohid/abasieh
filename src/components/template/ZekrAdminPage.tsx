import { ERROR } from "@/types/enums";
import { Zekr } from "@/types/types";
import Link from "next/link";
import ZekrAdminCart from "../constants/ZekrAdminCart";


const ZekrAdminPage = ({zekr}:any) => {
    return (
        <div className="p-5 md:p-8">
            <div className="toolbar !mb-0" >
                <h1 className="text-xl font-extrabold md:text-2xl" >ذکر ها</h1>
                <Link href="/admin-panel/zekr/add" className="btn btn-primary btn-sm" >افزودن ذکر</Link>
            </div>
            <div className="mt-6 grid gap-2" >
                {   
                    zekr.length ? 
                    zekr?.map( (zkr : Zekr , index: number)  => (<ZekrAdminCart key={index}  zekr={zkr} />) ) 
                    : <p className="empty">{ERROR.NO_ZEKR}</p>
                }
            </div>
        </div>
    );
};

export default ZekrAdminPage;
