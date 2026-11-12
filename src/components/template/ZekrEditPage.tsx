"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import ZekrTextInout from "@/module/ZekrTextInout";
import { Zekr, Zekr_Text } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";

const ZekrEditPage = ({years , zekr}:any) => {

    const ZEKR = JSON.parse(zekr)

    const { Title , Zekr_Text , Author , Year, _id} = ZEKR 
    const { FirstParagraph , SecondParagraph} = Zekr_Text
    
    
    const [loading, setLoading] = useState<boolean>(false);
    const [ FirstParagraphText , setFirstParagraphText ] = useState<Array<string>>(FirstParagraph.Zekr_text_p)
    const [ SecondParagraphText , setSecondParagraphText ] = useState<Array<string>>(SecondParagraph.Zekr_text_p)
    const [ zekrText , setZekrText ] = useState<Zekr_Text>({
        FirstParagraph:{
            Description : FirstParagraph.Description,
            Zekr_text_p : FirstParagraphText,
            hadith : FirstParagraph.hadith,
        },
        SecondParagraph: {
            Description : SecondParagraph.Description,
            Zekr_text_p : SecondParagraphText,
            hadith : SecondParagraph.hadith,
        },
    })

    const [ data , setData ] = useState<Zekr>({
        Title: Title,
        Zekr_Text : zekrText,
        Author: Author,
        Year: Year
    })
    const [Voice, setVoice] = useState(null);

    const router = useRouter();


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

    const editHandler = async (event : any) => {  

        event.preventDefault();

        const formData = new FormData();

        formData.append("Title", data.Title)
        formData.append("Author", data.Author)
        formData.append("Year", data.Year)
        formData.append("id", _id)

        if (!zekrText || !zekrText.FirstParagraph.Zekr_text_p.length || !zekrText.SecondParagraph.Zekr_text_p.length) {
            toast.error("فیلدهای ذکر نمی‌توانند خالی باشند.");           
            return;
        }
        formData.append("Zekr_Text" , JSON.stringify(zekrText ))
        if (Voice) {
            formData.append('Voice', Voice); 
        }
        

        setLoading( true );
        console.log("tttt")

        const res = await fetch("/api/zekr" , {
            method: "PATCH",
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
        <div className='p-5 md:p-8'>
            <div>
                <h1 className="text-xl font-extrabold md:text-2xl" >ویرایش ذکر</h1>
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
                        value={ data.Author }
                        name="Author"
                        changeHandler = {changeHandler}
                        label= "شاعر:"
                        type = "text"
                        textarea = {false} />
                    <div className="field-group">
                        <label className="field-label">سال</label>
                        <select name="Year" value={data.Year} onChange={changeHandler}
                            className="field" >
                            <option value="انتخاب سال">انتخاب سال</option>
                            <hr />
                            {
                                years.map((year:string, index:number) => (<option key={index} value={year} >{year}</option>))
                            }
                        </select>
                    </div>
                    <Input 
                        value={ zekrText.FirstParagraph.Description }
                        name="FirstParagraph.Description"
                        changeHandler = {zekrTextChangeHandler}
                        label= "توضیحات بند اول:"
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ zekrText.FirstParagraph.hadith }
                        name="FirstParagraph.hadith"
                        changeHandler = {zekrTextChangeHandler}
                        label= "حدیث بند اول:"
                        type = "text"
                        textarea = {true} />
                        <ZekrTextInout Str="اول" data={FirstParagraphText} setData={setFirstParagraphText} />
                    <Input 
                        value={ zekrText.SecondParagraph.Description }
                        name="SecondParagraph.Description"
                        changeHandler = {zekrTextChangeHandler}
                        label= "توضیحات بند دوم:"
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ zekrText.SecondParagraph.hadith }
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
                            Voice={ data.Voice }
                            ResetVoice = { ResetVoice }
                            textarea = {false} />
                        {Voice ? <button className="btn btn-secondary btn-sm w-fit" onClick={ResetVoice} >بارگذاری مجدد<IoReload/></button> : null }

                    {
                        loading ? <Loader /> :
                            <button onClick={editHandler} className="btn btn-primary btn-block btn-block-md-auto" >ویرایش</button>
                    }
                </form>
                <Toaster />
        </div>
    );

};

export default ZekrEditPage;
