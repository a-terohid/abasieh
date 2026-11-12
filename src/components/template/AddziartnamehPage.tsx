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
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/ziartnameh");
        }
    }

    return (
        <div className='p-5 md:p-8'>
            <div>
                <h1 className="text-xl font-extrabold md:text-2xl" >افزودن زیارت نامه</h1>
            </div>
            <form className="form mt-6" >
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
                        {Voice ? <button className="btn btn-secondary btn-sm w-fit" onClick={ResetVoice} >بارگذاری مجدد<IoReload/></button> : null }

                    {
                        loading ? <Loader /> :
                            <button onClick={AddHandler} className="btn btn-primary btn-block btn-block-md-auto" >افزودن</button>
                    }
                </form>
                <Toaster />
        </div>
    );
};

export default AddziartnamehPage;
