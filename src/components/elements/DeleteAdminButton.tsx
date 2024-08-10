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
          router.push( "/admin-panel/admins" );
        }
      }; 
    
    return (
        <div className="flex items-center">
            <button onClick={ deleteHandler } className=" cursor-pointer text-secondary-red-3 md:text-lg "><IoTrashOutline /></button>
            <Toaster />
        </div>
    );
};

export default DeleteAdminButton;