"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { TRUSTEES_ROLE } from "@/types/enums";
import { TRUSTEES_PERSONE } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";

const AddTrustessPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [ data , setData ] = useState<TRUSTEES_PERSONE>({
        fullName: "",
        phone: "",
        role: TRUSTEES_ROLE.NORMAL,
    })
    const [Voice, setVoice] = useState(null);

    const router = useRouter();

    const { fullName , phone , role } = data    

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        setVoice(file);
    };

    const ResetVoice = () => setVoice(null);

    const AddHandler = async (event : any) => {  

        event.preventDefault();

        const formData = new FormData();

        formData.append("fullName", fullName)
        formData.append("phone", phone)
        formData.append("role", role)

        if (Voice) {
            formData.append('img', Voice); 
        }

        setLoading( true );

        const res = await fetch("/api/trustees" , {
            method: "POST",
            body : formData,
        })

        const resData = await res.json()
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/trustees");
        }
    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" >افزودن عضو</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5 " >
                    <Input
                        value={ fullName }
                        name= "fullName"
                        changeHandler = {changeHandler}
                        label= " نام و نام خانوادگی:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ phone }
                        name="phone"
                        changeHandler = {changeHandler}
                        label= "شماره همراه:"
                        type = "text"
                        textarea = {false} />
                    <div className="flex flex-col gap-y-2 ">
                        <label>سمت:</label>
                        <select name="role" value={role} onChange={changeHandler}
                            className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1" >
                            <option value="انتخاب سمت">انتخاب سمت</option>
                            <hr />
                            <option value={TRUSTEES_ROLE.BOSS}>{TRUSTEES_ROLE.BOSS}</option>
                            <option value={TRUSTEES_ROLE.NORMAL}>{TRUSTEES_ROLE.NORMAL}</option>
                            <option value={TRUSTEES_ROLE.PLUS}>{TRUSTEES_ROLE.PLUS}</option>
                        </select>
                    </div>
                    <Input 
                            value={""}
                            name="Voice"
                            changeHandler = {fileChangeHandler}
                            label= "عکس :"
                            type = "file"
                            Voice={ Voice }
                            ResetVoice = { ResetVoice }
                            textarea = {false} />
                        {Voice ? <button className=" bg-primary-red-1 flex flex-row-reverse gap-x-3 items-center justify-center text-white w-fit rounded px-3 py-2  " onClick={ResetVoice} >بارگدازی مجدد<IoReload/></button> : null }

                    {
                        loading ? <Loader /> :
                            <button onClick={AddHandler} className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >افرودن</button>
                    }
                </form>
                <Toaster />
        </div>
    );
};

export default AddTrustessPage;