"use client"

import Input from "@/module/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import Loader from "@/module/Loader";

const AddCeremony = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
    const [data, setData] = useState({
        title: "",
        description: "",
        date: new Date().toISOString(),
    });

    const router = useRouter();
    const { title, description, date } = data;

    const changeHandler = (event: any) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };

    const dateHandler = (e: any) => {
        const date = new Date(e);
        setData({ ...data, date: date.toISOString() });
    };

    const fileChangeHandler = (event: any) => {
        const file = event.target.files[0] as File;
        setCoverImage(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setCoverImagePreview(previewUrl);
        }
    };

    const ResetCoverImage = () => {
        setCoverImage(null);
        setCoverImagePreview(null);
    };

    const handleImageChange = (e: any) => {
        const selectedFiles = Array.from(e.target.files) as File[];
        setImages((prevImages: File[]) => [...prevImages, ...selectedFiles]);

        const previewUrls = selectedFiles.map((file: File) => URL.createObjectURL(file));
        setImagePreviews((prevPreviews: string[]) => [...prevPreviews, ...previewUrls]);
    };

    const removeImage = (index: number) => {
        setImages((prevImages: File[]) => prevImages.filter((_, i) => i !== index));
        setImagePreviews((prevPreviews: string[]) => prevPreviews.filter((_, i) => i !== index));
    };

    const AddHandler = async (event : any) => {  

        event.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("date", date);

        if (coverImage) {
            formData.append("coverImage", coverImage);
        }
    

        images.forEach((image) => {
            formData.append(`images`, image);
        });


        setLoading( true );

        const res = await fetch("/api/ceremony" , {
            method: "POST",
            body : formData,
        })

        const resData = await res.json()
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/ceremony");
        }
    }

    return (
        <div className='py-4 px-5'>
            <div>
                <h1 className="font-bold text-xl">افزودن مراسم</h1>
            </div>
            <form className="flex flex-col gap-y-6 mt-5">
                <Input
                    value={title}
                    name="title"
                    changeHandler={changeHandler}
                    label="نام:"
                    type="text"
                    textarea={false}
                />
                <Input
                    value={description}
                    name="description"
                    changeHandler={changeHandler}
                    label="توضیحات:"
                    type="text"
                    textarea={true}
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
                <div className="mt-3">
                    <p className="mb-4">بنر مراسم:</p>
                    <input
                        type="file"
                        id="coverImageInput"
                        accept="image/*"
                        onChange={fileChangeHandler}
                        className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="coverImageInput" className="bg-primary-green-1 text-white rounded md:w-1/2 py-2 px-3 cursor-pointer">
                        {coverImage ? coverImage.name : "انتخاب تصویر کاور"}
                    </label>
                    {coverImagePreview && (
                        <div className="relative mt-4">
                            <img
                                src={coverImagePreview}
                                alt="Cover Image Preview"
                                className="w-56 hover:w-72 mt-5 object-cover rounded-lg"
                            />
                            <button onClick={ResetCoverImage} className="absolute mt-2 mr-2 top-0 right-0 bg-primary-red-2 text-white rounded-full p-1"><RiDeleteBin2Line /></button>
                        </div>
                    )}
                </div>
                <div className="mt-3">
                <p className="mb-4">تصاویر مراسم:</p>
                    <input
                        type="file"
                        id="imagesInput"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="imagesInput" className="bg-primary-green-1 text-white rounded md:w-1/2 py-2 px-3 cursor-pointer">
                        {images.length > 0 ? `${images.length} تصویر انتخاب شده` : "انتخاب تصاویر"}
                    </label>
                    <div className="flex flex-wrap gap-4 mt-5">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative flex flex-wrap items-center justify-center">
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="w-56 hover:w-72 object-cover rounded-lg"
                                />
                                <button onClick={() => removeImage(index)} className="absolute top-0 right-0 bg-primary-red-2 text-white rounded-full mt-2 mr-2 p-1"><RiDeleteBin2Line /></button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 mb-4">
                        {
                            loading ? <Loader /> :
                                <button onClick={AddHandler} className=" bg-primary-red-1 text-white rounded md:w-1/2 py-2" >افرودن</button>
                        }
                    </div>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default AddCeremony;