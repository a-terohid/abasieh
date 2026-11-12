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
        <div className='p-5 md:p-8'>
            <div>
                <h1 className="text-xl font-extrabold md:text-2xl">افزودن مراسم</h1>
            </div>
            <form className="form mt-6">
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
                    <p className="field-label mb-2">تاریخ</p>
                    <DatePicker
                        value={date}
                        onChange={dateHandler}
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                    />
                </div>
                <div className="mt-3">
                    <p className="field-label mb-3">بنر مراسم</p>
                    <input
                        type="file"
                        id="coverImageInput"
                        accept="image/*"
                        onChange={fileChangeHandler}
                        className="sr-only"
                        
                    />
                    <label htmlFor="coverImageInput" className="file-trigger">
                        {coverImage ? coverImage.name : "انتخاب تصویر کاور"}
                    </label>
                    {coverImagePreview && (
                        <div className="relative mt-4 w-fit">
                            <img
                                src={coverImagePreview}
                                alt="Cover Image Preview"
                                className="mt-4 h-40 w-56 rounded-xl border border-line object-cover"
                            />
                            <button onClick={ResetCoverImage} className="absolute top-2 start-2 grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-danger shadow-[var(--shadow-soft)]"><RiDeleteBin2Line /></button>
                        </div>
                    )}
                </div>
                <div className="mt-3">
                <p className="field-label mb-3">تصاویر مراسم</p>
                    <input
                        type="file"
                        id="imagesInput"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="sr-only"
                        
                    />
                    <label htmlFor="imagesInput" className="file-trigger">
                        {images.length > 0 ? `${images.length} تصویر انتخاب شده` : "انتخاب تصاویر"}
                    </label>
                    <div className="mt-4 flex flex-wrap gap-4">
                        {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative flex flex-wrap items-center justify-center">
                                <img
                                    src={preview}
                                    alt={`Preview ${index}`}
                                    className="h-40 w-56 rounded-xl border border-line object-cover"
                                />
                                <button onClick={() => removeImage(index)} className="absolute top-2 start-2 grid h-8 w-8 place-items-center rounded-full bg-surface/90 text-danger shadow-[var(--shadow-soft)]"><RiDeleteBin2Line /></button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5 mb-4">
                        {
                            loading ? <Loader /> :
                                <button onClick={AddHandler} className="btn btn-primary btn-block btn-block-md-auto" >افزودن</button>
                        }
                    </div>
                </div>
                <Toaster />
            </form>
        </div>
    );
};

export default AddCeremony;
