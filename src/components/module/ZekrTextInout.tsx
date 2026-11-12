import React from 'react';
import Input from './Input';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

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
    };

    const deleteHandler = (index: number) => {
        const newText = [...data]; // کپی آرایه‌ی data
        newText.splice(index, 1); // حذف مقدار در ایندکس مشخص
        setData(newText); // به‌روزرسانی استیت data
    };

    return (
        <div className="grid gap-3">
            {
                data.map( ( text:string, index:number ) => <div className="repeat-block"  key={ index } >
                    <Input
                        value={ text }
                        name="Original"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {`متن بند ${Str} — مصراع ${index + 1}`}
                        type = "text"
                        textarea = {false} />
                    <div>
                        <button type="button" className="btn btn-ghost btn-sm text-danger hover:!bg-danger-soft hover:!text-danger" onClick={ () => deleteHandler( index ) } ><FiTrash2 aria-hidden />{`حذف مصراع ${index + 1}`}</button>
                    </div>
                </div> )
            }
            <div>
                <button onClick={ addHandler } className="btn btn-secondary"  ><FiPlus aria-hidden />افزودن مصراع</button>
            </div>
        </div>
    );
};

export default ZekrTextInout;
