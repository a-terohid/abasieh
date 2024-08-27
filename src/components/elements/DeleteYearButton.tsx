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

        if (confirm("آیا می خواید سال را پاک کنید ؟ ") == false) {
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
            <button onClick={ deleteHandler } className="cursor-pointer flex gap-x-2 text-secondary-red-3 md:text-lg "><RxCross2 /></button>
          }         
          <Toaster />
        </div>
    );
};

export default DeleteYearButton;