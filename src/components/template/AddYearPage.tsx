"use client"

import { AuthType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { ERROR } from "@/types/enums";

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
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" >افزودن سال</h1>
            </div>
            <form  className="flex flex-col gap-y-6 mt-5  " >
                    <Input 
                        value={ Year }
                        name= "year"
                        changeHandler = {changeHandler}
                        label= "سال:"
                        type = "text"
                        textarea = {false} />
                   
                    {
                        loading ? <Loader /> :
                            <button type="submit" onClick={ signUpHandler } className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >افرودن</button>
                    }
                </form>
                <Toaster />
        </div>
    );
};

export default AddAdminPage;