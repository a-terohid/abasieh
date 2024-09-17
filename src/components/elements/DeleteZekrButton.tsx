"use client"

import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import Loader from "@/module/Loader";

const DeleteZekrButton = ({ _id ,admin }:any) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const deleteHandler = async () => {

        setLoading( true );

        if (confirm("آیا می خواهید ذکر را پاک کنید ؟ ") == false) {
          setLoading( false );
          return
        } 

        const res = await fetch(`/api/zekr/delete/${ _id }`, {
          method: "DELETE",
        });

        setLoading( false );
    
        const result = await res.json();
        console.log(result);
    
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(result.message);
          if(admin){
            router.push("/admin-panel/zekr");
          }else{
            router.refresh();
          }
        }
      }; 
    
      return (
        <div className="flex items-center">
          {  loading ? <Loader /> :           
            <button onClick={ deleteHandler } className={` cursor-pointer flex gap-x-2 text-secondary-red-3 ${admin ? " bg-primary-red-1 w-fit text-white rounded px-4 text-sm py-2":"md:text-lg"} `}>{admin ? "حذف ذکر": null}<IoTrashOutline /></button>
          }         
          <Toaster />
        </div>
    );
};

export default DeleteZekrButton;