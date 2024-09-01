import { ERROR } from "@/types/enums";
import { Zekr } from "@/types/types";
import Link from "next/link";
import ZekrAdminCart from "../constants/ZekrAdminCart";


const ZekrAdminPage = ({zekr}:any) => {
    return (
        <div className="py-4 px-5">
            <div className="flex justify-between items-center" >
                <h1 className="font-bold md:text-lg" >ذکر ها:</h1>
                <Link href="/admin-panel/zekr/add" className="px-2 py-1 text-sm md:text-base bg-primary-red-2 rounded-lg cursor-pointer text-text-dark" >افزودن ذکر</Link>
            </div>
            <div className="flex flex-col gap-y-2 mt-4" >
                {   
                    zekr.length ? 
                    zekr?.map( (zkr : Zekr , index: number)  => (<ZekrAdminCart key={index}  zekr={zkr} />) ) 
                    : <p>{ERROR.NO_ZEKR}</p>
                }
            </div>
        </div>
    );
};

export default ZekrAdminPage;