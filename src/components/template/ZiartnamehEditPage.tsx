"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import ZiatnamehTextInput from "@/module/ZiatnamehTextInput";
import { Ziartnameh } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";

const ZiartnamehEditPage = ({ziartnameh}:any) => {

    const  ZIartnameh = JSON.parse( ziartnameh )

    const { Title , Description , Text , Voice ,_id } = ZIartnameh

    const [loading, setLoading] = useState<boolean>(false);
    const [ data , setData ] = useState<Ziartnameh>({
        Title :Title, 
        Description : Description,
        Text: Text,
    })
    const [VoiceEdite, setVoice] = useState(Voice);

    const router = useRouter();
   

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
    }

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        setVoice(file);
    };

    const ResetVoice = () => setVoice(null);

    const editHandler = async (event : any) => {  

        event.preventDefault();

        const formData = new FormData();

        formData.append("Title", data.Title)
        formData.append("Description",  data.Description)
        formData.append("Text", JSON.stringify(data.Text))
        formData.append("id", _id)

        if (VoiceEdite) {
            formData.append('Voice', VoiceEdite || ""); 
        }

        setLoading( true );

        const res = await fetch("/api/Ziartnameh" , {
            method: "PATCH",
            body : formData,
        })

        const resData = await res.json()
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push(`/admin-panel/ziartnameh/${_id}`);
        }
    }

    return (
        <div className='p-5 md:p-8'>
            <div>
                <h1 className="text-xl font-extrabold md:text-2xl" >ویرایش {Title}</h1>
            </div>
            <form className="form mt-6" >
                    <Input
                        value={ data.Title }
                        name= "Title"
                        changeHandler = {changeHandler}
                        label= "نام:"
                        type = "text"
                        textarea = {false} />
                    <Input
                        value={  data.Description }
                        name="Description"
                        changeHandler = {changeHandler}
                        label= "توضیحات:"
                        type = "text"
                        textarea = {true} />
                    <ZiatnamehTextInput data={data} setData={setData} />
                    <Input 
                            value={''}
                            name="Voice"
                            changeHandler = {fileChangeHandler}
                            label= "فایل صوتی:"
                            type = "file"
                            Voice={ VoiceEdite }
                            ResetVoice = { ResetVoice }
                            textarea = {false} />
                        {VoiceEdite ? <button className="btn btn-secondary btn-sm w-fit" onClick={ResetVoice} >بارگذاری مجدد<IoReload/></button> : null }

                    {
                        loading ? <Loader /> :
                            <button onClick={editHandler} className="btn btn-primary btn-block btn-block-md-auto" >ویرایش</button>
                    }
             </form>
                <Toaster />
        </div>
    );
};

export default ZiartnamehEditPage;
