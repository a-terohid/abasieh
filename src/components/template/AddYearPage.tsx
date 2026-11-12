"use client"

import { AuthType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { ERROR } from "@/types/enums";
import { currentJalaliYear } from "@/utils/jalali";

const AddAdminPage = () => {

    const [ Year , setYear ] = useState<string>("")

    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        setYear(event.target.value )
    }

    const signUpHandler = async ( event: any ) => {

        event.preventDefault(); 


        setLoading( true );

        const res = await fetch("/api/year" , {
            method: "POST",
            body : JSON.stringify({
                "year" : Year
            }),
            headers: { "Content-Type": "application/json" },
        })

        const resData = await res.json()
        console.log( resData );

        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            router.push("/admin-panel/year");
        }

    }

    return (
        <div className='p-5 md:p-8'>
            <div>
                <h1 className="text-xl font-extrabold md:text-2xl" >افزودن سال</h1>
            </div>
            <form  className="form mt-6" >
                    <Input 
                        value={ Year }
                        name= "year"
                        changeHandler = {changeHandler}
                        label= "سال (هجری شمسی):"
                        type = "text"
                        inputMode = "numeric"
                        placeholder = {`مثلاً ${currentJalaliYear()}`}
                        textarea = {false} />
                   
                    {
                        loading ? <Loader /> :
                            <button type="submit" onClick={ signUpHandler } className="btn btn-primary btn-block btn-block-md-auto" >افزودن</button>
                    }
                </form>
                <Toaster />
        </div>
    );
};

export default AddAdminPage;
