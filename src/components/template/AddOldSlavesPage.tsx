"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { OLD_SLAVES } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const AddOldSlavesPage = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OLD_SLAVES>({
        fullName: "",
        date: new Date().toISOString(),
    })
    const [Voice, setVoice] = useState<any>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const router = useRouter();

    const { fullName, date } = data    

    const changeHandler = (event: any) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    }

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            setVoice(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const dateHandler = (e: any) => {
        const date = new Date(e);
        setData({ ...data, date: date.toISOString() });
    };

    const ResetVoice = () => {
        setVoice(null);
        setPreviewImage(null);
    };

    const AddHandler = async (event: any) => {  
        event.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("date", date);
        if (Voice) {
            formData.append('img', Voice); 
        }
        setLoading(true);
        const res = await fetch("/api/oldSlaves", {
            method: "POST",
            body: formData,
        });
        const resData = await res.json();
        setLoading(false);
        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/oldSlaves");
        }
    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl">افزودن پیر غلام</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5">
                <Input
                    value={fullName}
                    name="fullName"
                    changeHandler={changeHandler}
                    label=" نام و نام خانوادگی:"
                    type="text"
                    textarea={false} 
                />
                <div style={{ direction: "rtl" }}>
                    <p className="mb-2">تاریخ:</p>
                    <DatePicker
                        value={date}
                        onChange={dateHandler}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                    />
                </div>
                <Input 
                    value={""}
                    name="Voice"
                    changeHandler={fileChangeHandler}
                    label="عکس :"
                    type="file"
                    Voice={Voice}
                    ResetVoice={ResetVoice}
                    textarea={false}
                />
                {previewImage && (
                    <div className="flex flex-col gap-y-4">
                        <p>پیش نمایش عکس:</p>
                        <img src={previewImage} alt="Preview" className="w-40 h-40 rounded-lg shadow-lg object-cover" />
                    </div>
                )}
                {Voice && (
                    <button className="bg-primary-red-1 flex flex-row-reverse gap-x-3 items-center justify-center text-white w-fit rounded px-3 py-2" onClick={ResetVoice}>
                        بارگدازی مجدد<IoReload />
                    </button>
                )}
                {loading ? <Loader /> :
                    <button onClick={AddHandler} className="bg-primary-red-1 text-white rounded md:w-1/2 py-2">
                        افرودن
                    </button>
                }
            </form>
            <Toaster />
        </div>
    );
};

export default AddOldSlavesPage;