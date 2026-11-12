"use client"

import Loader from "@/module/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";


const DeleteYearButton = ({year}:any) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const deleteHandler = async () => {

        setLoading( true );

        if (confirm("آیا می خواهید سال را پاک کنید ؟ ") == false) {
          setLoading( false );
          return
        } 

        const res = await fetch(`/api/year`, {
          method: "DELETE",
          body : JSON.stringify({
            "year" : year
          }),
        });

        setLoading( false );
    
        const result = await res.json();
        console.log(result);
    
        if (result.error) {
          toast.error(result.error);
        } else {
            toast.success(result.message);
            router.refresh();
        }
        
      }; 
    
    return (
        <div className="flex items-center">
          {  loading ? <Loader /> :           
            <button type="button" onClick={ deleteHandler } className="icon-btn icon-btn-sm icon-btn-danger" aria-label={`حذف سال ${year}`}><RxCross2 aria-hidden /></button>
          }         
          <Toaster />
        </div>
    );
};

export default DeleteYearButton;
