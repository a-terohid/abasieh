"use client"

import Input from "@/module/Input";
import { TextZiartnamehInput, Ziartnameh_text_part } from "@/types/types";



const ZiatnamehTextInput = ({data , setData} :TextZiartnamehInput ) => {

    const { Text } = data;
    
    const changeHandler = (e : any, index : number) => {
        const { name, value } = e.target;
        const key = name as keyof Ziartnameh_text_part;
        const newText = [...Text];
        newText[index] = {
            ...newText[index],
            [key]: value
        };
        setData({ ...data, Text: newText });
        
    };

    const addHnadler = (event: any) => {

        event.preventDefault();

        setData({
            ...data,
            Text: [...Text, { Supplement: "", Original: "", Translation: "" }],
          });
    }

    const deleteHandler = (index : number) => { 
        const newText = [...Text];
        newText.splice(index, 1);
        setData({ ...data, Text: newText });
    };


    return (
        <div>
            {
                Text.map( ( text, index ) => <div className="flex flex-col gap-y-3 mb-4"  key={ index } >
                    <Input 
                        value={ text.Original }
                        name="Original"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {` متن عربی - بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ text.Translation }
                        name="Translation"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {` ترجمه فارسی - بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <Input 
                        value={ text.Supplement || "" }
                        name="Supplement"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {` توضیحات اضافی - بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <div>
                        <p className=" bg-primary-red-3 text-white rounded w-fit py-2 px-3  cursor-pointer"  onClick={ () => deleteHandler( index ) } >{`حذف بخش ${index + 1}`}</p>
                    </div>
                </div> )
            }
            <button onClick={ addHnadler } className=" bg-primary-green-1 text-white rounded md:w-1/2 py-2 px-3 cursor-pointer"  >افزودن بخش</button>
        </div>
    );
};

export default ZiatnamehTextInput;