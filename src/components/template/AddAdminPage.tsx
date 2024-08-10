"use client"

import { AuthType } from "@/types/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { ERROR } from "@/types/enums";

type s = {
    error?: string | undefined
    status?: number
    ok?: boolean
    url?: string | null
}

const AddAdminPage = () => {

    const [ data , setData ] = useState<AuthType>({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState<boolean>(false);
    const [repeat, setrepeat] = useState<string>("");

    const { email, password } = data

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const signUpHandler = async ( event: any ) => {

        event.preventDefault(); 

        if( password !== repeat ){
            toast.error( ERROR.REPEAT_PASSWORD );
            return;
        }

        setLoading( true );

        const res = await fetch("/api/auth/signup" , {
            method: "POST",
            body : JSON.stringify( data ),
            headers: { "Content-Type": "application/json" },
        })

        const resData = await res.json()
        console.log( resData );

        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            router.push("/admin-panel/admins");
        }

    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" >افزودن ادمین</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5 " >
                    <Input 
                        value={ email }
                        name= "email"
                        changeHandler = {changeHandler}
                        label= "ایمیل:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ password }
                        name="password"
                        changeHandler = {changeHandler}
                        label= "پسورد:"
                        type = "password"
                        textarea = {false} />
                    <Input 
                        value={ repeat }
                        name="password"
                        changeHandler = { (event:any) => setrepeat(event.target.value) }
                        label= "تکرار پسورد:"
                        type = "password" 
                        textarea = {false}/>
                   
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