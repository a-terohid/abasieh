"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { AuthType } from "@/types/types";
import { useRouter } from 'next/navigation'
import Link from "next/link";
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
        <div className="shell flex min-h-[calc(100dvh-14rem)] items-center justify-center py-12" >
            <div className="card w-full max-w-sm p-6 sm:p-8" >
                <div className="mb-6 grid gap-1">
                    <span className="eyebrow">پنل مدیریت</span>
                    <h1 className="text-2xl font-extrabold" >ورود</h1>
                </div>
                <form className="grid gap-5" >
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
                    <Link href="/forgot-password" className="link -mt-2 justify-self-end text-sm">رمز عبور را فراموش کرده‌اید؟</Link>
                   
                    {
                        loading ? <div className="flex justify-center"><Loader /></div> :
                            <button type="submit" onClick={ signinHandler } className="btn btn-primary btn-block" >ورود</button>
                    }
                </form>
            </div>
           <Toaster />
        </div>
    );
};

export default Signin;
