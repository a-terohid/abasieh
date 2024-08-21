"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import ZiatnamehTextInput from "@/module/ZiatnamehTextInput";
import { Ziartnameh } from "@/types/types";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { IoReload } from "react-icons/io5";
import { useRouter } from "next/navigation";



const AddziartnamehPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [ data , setData ] = useState<Ziartnameh>({
        Title: "",
        Description: "",
        Text: [],
    })
    const [Voice, setVoice] = useState(null);

    const router = useRouter();

    const { Title , Description , Text } = data    

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

        formData.append("Title", Title)
        formData.append("Description", Description)
        formData.append("Text", JSON.stringify(Text))

        if (Voice) {
            formData.append('Voice', Voice); 
        }

        setLoading( true );

        const res = await fetch("/api/Ziartnameh" , {
            method: "POST",
            body : formData,
        })

        const resData = await res.json()
        console.log( resData );

        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            router.push("/admin-panel/ziartnameh");
        }
    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" >افزودن زیارت نامه</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5 " >
                    <Input
                        value={ Title }
                        name= "Title"
                        changeHandler = {changeHandler}
                        label= "نام:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ Description }
                        name="Description"
                        changeHandler = {changeHandler}
                        label= "توضیحات:"
                        type = "text"
                        textarea = {true} />
                    <ZiatnamehTextInput data={data} setData={setData} />
                    <Input 
                            value={""}
                            name="Voice"
                            changeHandler = {fileChangeHandler}
                            label= "فایل صوتی:"
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

export default AddziartnamehPage;