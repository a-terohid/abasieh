"use client"

import Input from "@/module/Input";
import Loader from "@/module/Loader";
import { TRUSTEES_ROLE } from "@/types/enums";
import { TRUSTEES_PERSONE } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoReload } from "react-icons/io5";

const TrustessEditpage = ({trustess}:any) => {

    const Trustess = JSON.parse(trustess);
    
    const [isChecked, setIsChecked] = useState(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [ data , setData ] = useState<TRUSTEES_PERSONE>({
        fullName: Trustess.fullName,
        phone: Trustess.phone,
        role: Trustess.role,
    })
    const [Voice, setVoice] = useState(Trustess.img);

    const router = useRouter();

    const { fullName , phone , role } = data    

    const handleCheckboxChange = (event : any) => {
        setIsChecked(event.target.checked);
    };    

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

        formData.append("fullName", fullName)
        formData.append("phone", phone)
        formData.append("role", role)
        formData.append("id", Trustess._id)
        formData.append("isChecked", JSON.stringify(isChecked))

        if (Voice) {
            formData.append('img', Voice); 
        }

        setLoading( true );

        const res = await fetch("/api/trustees" , {
            method: "PATCH",
            body : formData,
        })

        const resData = await res.json()
        
        setLoading( false );
        

        if (resData.error) {
            toast.error(resData.error);
        } else {
            toast.success(resData.message);
            router.push("/admin-panel/trustees");
        }
    }

    return (
        <div className='p-5 md:p-8'>
            <div>
            <h1 className="text-xl font-extrabold md:text-2xl" >ویرایش عضو</h1>
            </div>
            <form className="form mt-6" >
                    <Input
                        value={ fullName }
                        name= "fullName"
                        changeHandler = {changeHandler}
                        label= " نام و نام خانوادگی:"
                        type = "text"
                        textarea = {false} />
                    <Input 
                        value={ phone }
                        name="phone"
                        changeHandler = {changeHandler}
                        label= "شماره همراه:"
                        type = "text"
                        textarea = {false} />
                    <div className="field-group">
                        <label className="field-label">سمت</label>
                        <select name="role" value={role} onChange={changeHandler}
                            className="field" >
                            <option value="انتخاب سمت">انتخاب سمت</option>
                            <hr />
                            <option value={TRUSTEES_ROLE.BOSS}>{TRUSTEES_ROLE.BOSS}</option>
                            <option value={TRUSTEES_ROLE.NORMAL}>{TRUSTEES_ROLE.NORMAL}</option>
                            <option value={TRUSTEES_ROLE.PLUS}>{TRUSTEES_ROLE.PLUS}</option>
                        </select>
                    </div>
                    <div className="check" >
                        <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        />
                        <p>حذف و تغییر عکس</p>
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
                                {Voice ? <button className="btn btn-secondary btn-sm mt-3 w-fit" onClick={ResetVoice} >بارگذاری مجدد<IoReload/></button> : null }
                        </div> : null
                    }
                    {
                        loading ? <Loader /> :
                            <button onClick={editHandler} className="btn btn-primary btn-block btn-block-md-auto" >ویرایش</button>
                    }
                </form>
                <Toaster />
        </div>
    )
};

export default TrustessEditpage;
