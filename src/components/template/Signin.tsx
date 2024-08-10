"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { AuthType } from "@/types/types";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { SignInResponse, signIn } from "next-auth/react";

type s = {
    error?: string | undefined
    status?: number
    ok?: boolean
    url?: string | null
}

const Signin =() => {

    const [ data , setData ] = useState<AuthType>({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState<boolean>(false);

    const { email, password } = data

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const signinHandler = async ( event: any ) => {

        event.preventDefault();

        setLoading( true );

        const res : Promise<s> | any = await signIn( "credentials" , {
            email,
            password,
            redirect: false,
        })

        setLoading(false);
        

        if ( res.error ) {
            toast.error( res.error );
        } else {
            router.push("/");
        }

    }


    return (
        <div className=" container flex flex-col h-[600px] items-center justify-center" >
            <div className="w-fit p-7 shadow-xl md:w-96 dark:bg-background-dark-2 bg-background-light-2 rounded-lg" >
                <h4 className="text-2xl text-Yellow font-bold" >ورود</h4>
                <form className="flex flex-col gap-y-6 mt-5" >
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
                   
                    {
                        loading ? <Loader /> :
                            <button type="submit" onClick={ signinHandler } className=" bg-primary-red-1 text-white rounded py-2" >ورود</button>
                    }
                </form>
            </div>
           <Toaster />
        </div>
    );
};

export default Signin;