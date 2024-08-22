"use client"

import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import Loader from "@/module/Loader";

const DeleteZiartnamehButton = ({ _id }:any) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const deleteHandler = async () => {

        setLoading( true );

        if (confirm("آیا می خواید زیارت نامه را پاک کنید ؟ ") == false) {
          setLoading( false );
          return
        } 

        const res = await fetch(`/api/Ziartnameh/delete/${ _id }`, {
          method: "DELETE",
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
            <button onClick={ deleteHandler } className=" cursor-pointer text-secondary-red-3 md:text-lg "><IoTrashOutline /></button>
          }         
          <Toaster />
        </div>
    );
};

export default DeleteZiartnamehButton;