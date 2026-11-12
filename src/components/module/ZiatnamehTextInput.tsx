"use client"

import Input from "@/module/Input";
import { TextZiartnamehInput, Ziartnameh_text_part } from "@/types/types";
import { FiPlus, FiTrash2 } from "react-icons/fi";



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
        <div className="grid gap-4">
            {
                Text.map( ( text, index ) => <fieldset className="repeat-block"  key={ index } >
                    <legend className="badge badge-accent">بخش {index + 1}</legend>
                    <Input
                        value={ text.Original }
                        name="Original"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {`متن عربی — بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <Input
                        value={ text.Translation }
                        name="Translation"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {`ترجمه فارسی — بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <Input
                        value={ text.Supplement || "" }
                        name="Supplement"
                        changeHandler = {(e:any) => changeHandler(e, index)}
                        label= {`توضیحات اضافی — بخش ${index + 1}`}
                        type = "text"
                        textarea = {true} />
                    <div>
                        <button type="button" className="btn btn-ghost btn-sm text-danger hover:!bg-danger-soft hover:!text-danger" onClick={ () => deleteHandler( index ) } ><FiTrash2 aria-hidden />{`حذف بخش ${index + 1}`}</button>
                    </div>
                </fieldset> )
            }
            <div>
                <button onClick={ addHnadler } className="btn btn-secondary"  ><FiPlus aria-hidden />افزودن بخش</button>
            </div>
        </div>
    );
};

export default ZiatnamehTextInput;
