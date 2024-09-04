"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import ZekrTextInout from "@/module/ZekrTextInout";
import { Zekr, Zekr_Text } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";

const AddZekrPage = ({years}:any) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [ FirstParagraphText , setFirstParagraphText ] = useState<Array<string>>([])
    const [ SecondParagraphText , setSecondParagraphText ] = useState<Array<string>>([])
    const [ zekrText , setZekrText ] = useState<Zekr_Text>({
        FirstParagraph:{
            Description : '',
            Zekr_text_p : FirstParagraphText,
            hadith : "",
        },
        SecondParagraph: {
            Description : '',
            Zekr_text_p : SecondParagraphText,
            hadith : "",
        },
    })

    const [ data , setData ] = useState<Zekr>({
        Title: "",
        Zekr_Text : zekrText,
        Author: "",
        Year:""
    })
    const [Voice, setVoice] = useState(null);

    const router = useRouter();

    const { Title , Zekr_Text , Author , Year} = data    
    const{ FirstParagraph , SecondParagraph} = zekrText

    const changeHandler = ( event: any ) => {
        const { name , value } = event.target
        setData({ ...data , [ name ] : value })
        
    }

    const zekrTextChangeHandler = (event: any) => {
        const { name, value } = event.target;
        const [paragraph, field] = name.split('.'); // تقسیم نام فیلد به دو بخش
    
        // به‌روزرسانی zekrText و حفظ مقادیر قبلی
        setZekrText((prevState:any) => ({
            ...prevState, // حفظ بخش‌های دیگر
            [paragraph]: { 
                ...prevState[paragraph], // حفظ مقادیر قبلی پاراگراف
                [field]: value // تغییر فیلد خاص
            }
        }));

    };

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        setVoice(file);
    };

    const ResetVoice = () => setVoice(null);

    useEffect(() => {
        setZekrText((prevState) => ({
            ...prevState,
            FirstParagraph: {
                ...prevState.FirstParagraph,
                Zekr_text_p: FirstParagraphText,
            },
        }));
    }, [FirstParagraphText]);

    useEffect(() => {
        setZekrText((prevState) => ({
            ...prevState,
            SecondParagraph: {
                ...prevState.SecondParagraph,
                Zekr_text_p: SecondParagraphText,
            },
        }));
    }, [SecondParagraphText]);

    const AddHandler = async (event : any) => {  

        event.preventDefault();

        const formData = new FormData();

        formData.append("Title", Title)
        formData.append("Author", Author)
        formData.append("Year", Year)

        if (!zekrText || !zekrText.FirstParagraph.Zekr_text_p.length || !zekrText.SecondParagraph.Zekr_text_p.length) {
            toast.error("فیلدهای ذکر نمی‌توانند خالی باشند.");           
            return;
        }
        
        // console.log(zekrText , JSON.stringify(zekrText));
        formData.append("Zekr_Text" , JSON.stringify(zekrText ))
        if (Voice) {
            formData.append('Voice', Voice); 
        }
        
        setLoading( true );

        const res = await fetch("/api/zekr" , {
            method: "POST",
            body : formData,
        })

        const resData = await res.json()
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/zekr");
        }
    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl" >افزودن ذکر</h1>
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
                        value={ Author }
                        name="Author"
                        changeHandler = {changeHandler}
                        label= "شاعر:"
                        type = "text"
                        textarea = {false} />
                    <div className="flex flex-col gap-y-2 ">
                        <label>سال:</label>
                        <select name="Year" value={Year} onChange={changeHandler}
                            className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1" >
                            <option value="انتخاب سال">انتخاب سال</option>
                            <hr />
                            {
                                years.map((year:string, index:number) => (<option key={index} value={year} >{year}</option>))
                            }
                        </select>
                    </div>
                    <Input 
                        value={ FirstParagraph.Description }
                        name="FirstParagraph.Description"
                        changeHandler = {zekrTextChangeHandler}
                        label= "توضیحات بند اول:"
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ FirstParagraph.hadith }
                        name="FirstParagraph.hadith"
                        changeHandler = {zekrTextChangeHandler}
                        label= "حدیث بند اول:"
                        type = "text"
                        textarea = {true} />
                        <ZekrTextInout Str="اول" data={FirstParagraphText} setData={setFirstParagraphText} />
                    <Input 
                        value={ SecondParagraph.Description }
                        name="SecondParagraph.Description"
                        changeHandler = {zekrTextChangeHandler}
                        label= "توضیحات بند دوم:"
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ SecondParagraph.hadith }
                        name="SecondParagraph.hadith"
                        changeHandler = {zekrTextChangeHandler}
                        label= "حدیث بند دوم:"
                        type = "text"
                        textarea = {true} />
                        <ZekrTextInout Str="دوم" data={SecondParagraphText} setData={setSecondParagraphText} />
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

export default AddZekrPage;