"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import Input from "./Input";
import Loader from "./Loader";
import toast, { Toaster } from "react-hot-toast";

const ContactForm = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [ data , setData ] = useState({ 
        Email : "", 
        Name: "",
        Text:"",
        Subject:"", 
    })

    const { Email, Name, Text, Subject } = data

    const router = useRouter();

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const sendHandler = async ( event: any ) => {

        event.preventDefault(); 


        setLoading( true );

        const res = await fetch("/api/send" , {
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
            toast.success(resData.message)
            setData({ 
                Email : "", 
                Name: "",
                Text:"",
                Subject:"", 
            })
        }

    }

    return (
        <div className="px-5 py-4 dark:bg-background-dark-5 bg-background-light-1 rounded-lg  bg-Dark text-f6  shadow-md mt-4 " >
            <form  className="flex flex-col gap-y-6 my-2  " >
                    <Input
                        value={ Name }
                        name= "Name"
                        changeHandler = {changeHandler}
                        label= "نام:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ Email }
                        name="Email"
                        changeHandler = {changeHandler}
                        label= "ایمیل:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ Subject }
                        name="Subject"
                        changeHandler = {changeHandler}
                        label= "موضوع:"
                        type = "text"
                        textarea = {false} />
                     <Input 
                        value={ Text }
                        name="Text"
                        changeHandler = {changeHandler}
                        label= "متن پیام:"
                        type = "text"
                        textarea = {true} />
                    {
                        loading ? <Loader /> :
                            <button type="submit" onClick={ sendHandler } className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >ارسال</button>
                    }
                </form>
            <Toaster />
        </div>
    );
};

export default ContactForm;