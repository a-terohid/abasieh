"useclient"

import Loader from '@/module/Loader';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteTrustessButton = ({_id}:any) => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const deleteHandler = async () => {

        setLoading( true );

        if (confirm("آیا می خواهید عضو را پاک کنید ؟ ") == false) {
          setLoading( false );
          return
        } 

        const res = await fetch(`/api/trustees/delete/${ _id }`, {
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
    }
        
    
      return (
        <div className="flex items-center">
          {  loading ? <Loader /> :           
            <button onClick={ deleteHandler } className={` cursor-pointer flex gap-x-2 text-secondary-red-3 md:text-lg `}><IoTrashOutline /></button>
          }         
          <Toaster />
        </div>
    );
}

export default DeleteTrustessButton;