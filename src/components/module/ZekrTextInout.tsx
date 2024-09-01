import React from 'react';
import Input from './Input';

const ZekrTextInout = ({data , setData,Str}:any) => {

    const addHandler = (event: any) => {
        event.preventDefault();
        setData([...data, ""]); // یک رشته خالی به آرایه اضافه می‌کنیم
    };

    const changeHandler = (e: any, index: number) => {
        const { value } = e.target; // فقط value نیاز است، name دیگر کاربرد ندارد
        const newText = [...data]; // data آرایه‌ای از رشته‌هاست
        newText[index] = value; // مقدار جدید را جایگزین مقدار قبلی در ایندکس مشخص می‌کنیم
        setData(newText); // استیت data را به‌روزرسانی می‌کنیم
        console.log(data);
    };

    const deleteHandler = (index: number) => { 
        const newText = [...data]; // کپی آرایه‌ی data
        newText.splice(index, 1); // حذف مقدار در ایندکس مشخص
        setData(newText); // به‌روزرسانی استیت data
    };

    return (
        <div>
            {
                data.map( ( text:string, index:number ) => <div className="flex flex-col gap-y-3 mb-4"  key={ index } >
                    <Input
                        value={ text }
                        name="Original"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {`  متن بند  ${Str} - مصراع ${index + 1}`}
                        type = "text"
                        textarea = {false} />
                    <div>
                        <p className=" bg-primary-red-3 text-white rounded w-fit py-2 px-3  cursor-pointer"  onClick={ () => deleteHandler( index ) } >{`حذف مصراع ${index + 1}`}</p>
                    </div>
                </div> )
            }
            <button onClick={ addHandler } className=" bg-primary-green-1 text-white rounded md:w-1/2 py-2 px-3 cursor-pointer"  >افزودن مصراع</button>
        </div>
    );
};

export default ZekrTextInout;