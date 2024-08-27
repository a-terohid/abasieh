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
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" > ویرایش {Title} :</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5 " >
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
                        {VoiceEdite ? <button className=" bg-primary-red-1 flex flex-row-reverse gap-x-3 items-center justify-center text-white w-fit rounded px-3 py-2  " onClick={ResetVoice} >بارگدازی مجدد<IoReload/></button> : null }

                    {
                        loading ? <Loader /> :
                            <button onClick={editHandler} className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >ویرایش</button>
                    }
             </form>
                <Toaster />
        </div>
    );
};

export default ZiartnamehEditPage;