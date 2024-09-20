"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { OLD_SLAVES } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin2Line } from "react-icons/ri";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { IoReload } from "react-icons/io5";

const EditOldSlavesPage = ({ oldSlaves }: any) => {

    const OldSlaves = JSON.parse(oldSlaves);

    const [isChecked, setIsChecked] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<OLD_SLAVES>({
        fullName: OldSlaves.fullName,
        date: OldSlaves.date,
    });

    const [Voice, setVoice] = useState(OldSlaves.img);

    const router = useRouter();

    const { fullName, date } = data;

    const changeHandler = (event: any) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0];
        setVoice(file);
        
    };


    const dateHandler = (e: any) => {
        const date = new Date(e);
        setData({ ...data, date: date.toISOString() });
    };

    const handleCheckboxChange = (event: any) => {
        setIsChecked(event.target.checked);
    };

    const ResetVoice = () => setVoice(null);

    const EditeHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("date", date);
        formData.append("id", OldSlaves._id)
        formData.append("isChecked", JSON.stringify(isChecked))


        if (Voice) {
            formData.append('img', Voice);
        }
        setLoading(true);
        const res = await fetch("/api/oldSlaves", {
            method: "PATCH",
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
    };

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl">ویرایش پیر غلام</h1>
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
                <div className="flex gap-x-2 items-center" >
                        <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        />
                        <p>حدف و تغییر عکس</p>
                    </div>
                    {
                        isChecked ? <div>
                                <Input 
                                value={""}
                                name="Voice"
                                changeHandler = {fileChangeHandler}
                                label= "عکس :"
                                type = "file"
                                Voice={ Voice }
                                ResetVoice = { ResetVoice }
                                textarea = {false} />
                                {Voice ? <button className=" bg-primary-red-1 flex flex-row-reverse gap-x-3 items-center justify-center text-white w-fit rounded px-3 py-2 mt-4 " onClick={ResetVoice} >بارگدازی مجدد<IoReload/></button> : null }
                        </div> : null
                    }
                    {
                        loading ? <Loader /> :
                            <button onClick={EditeHandler} className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >ویرایش</button>
                    }
            </form>
            <Toaster />
        </div>
    );
};

export default EditOldSlavesPage;