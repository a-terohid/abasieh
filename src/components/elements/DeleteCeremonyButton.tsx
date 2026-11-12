"use client"

import Loader from '@/module/Loader';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteCeremonyButton = ({ _id ,admin }:any) => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const deleteHandler = async () => {

        setLoading( true );

        if (confirm("آیا می خواهید مراسم را پاک کنید ؟ ") == false) {
          setLoading( false );
          return
        } 

        const res = await fetch(`/api/ceremony/delete/${ _id }`, {
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
            router.push("/admin-panel/ceremony");
          }else{
            router.refresh();
          }
        }
      }; 
    
      return (
        <div className="flex items-center">
          {  loading ? <Loader /> :           
            <button type="button" onClick={ deleteHandler } className={admin ? "btn btn-danger btn-sm" : "icon-btn icon-btn-sm icon-btn-danger"} aria-label={admin ? undefined : "حذف"}>{admin ? "حذف مراسم": null}<IoTrashOutline aria-hidden /></button>
          }         
          <Toaster />
        </div>
    );
};

export default DeleteCeremonyButton;
