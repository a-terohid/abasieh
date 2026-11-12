"use client"

import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";

const DeleteAdminButton = ({ _id }:any) => {

    const router = useRouter();

    const deleteHandler = async () => {

        const res = await fetch(`/api/auth/delete/${ _id }`, {
          method: "DELETE",
        });
    
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
            <button type="button" onClick={ deleteHandler } className="icon-btn icon-btn-sm icon-btn-danger" aria-label="حذف"><IoTrashOutline aria-hidden /></button>
            <Toaster />
        </div>
    );
};

export default DeleteAdminButton;
