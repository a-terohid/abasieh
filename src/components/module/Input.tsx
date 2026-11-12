"use client"

import { useId } from "react";
import { InputType } from "@/types/types";
import { FiUploadCloud } from "react-icons/fi";

const Input = ( { changeHandler , value, label , type , name , textarea = false, Voice , ResetVoice, placeholder, inputMode  } : InputType ) => {

    const id = useId();
    const cleanLabel = typeof label === "string" ? label.trim().replace(/[:：]\s*$/, "") : label;

    return (
        <div className="field-group" >
            {
                type !== "file" || textarea ? <label htmlFor={id} className="field-label">{ cleanLabel }</label> : <span className="field-label">{ cleanLabel }</span>
            }
            {
                textarea ?
                    <textarea
                    id={id}
                    value={ value }
                    name={ name }
                    rows={5}
                    onChange={ ( event ) => changeHandler( event ) }
                    className="field" />
                :
                  type !== "file" ?
                    <input
                    id={id}
                    type={ type }
                    placeholder={ placeholder }
                    inputMode={ inputMode }
                    value={  value }
                    name={ name }
                    onChange={ ( event ) => changeHandler( event ) }
                    className="field" />
                :  <div>
                        <input
                        type={ type }
                        id={id}
                        name={ name }
                        onChange={ ( event ) => changeHandler( event ) }
                        className="sr-only" />
                        <label htmlFor={id} className="file-trigger" >
                            <FiUploadCloud aria-hidden className="shrink-0 text-lg text-accent" />
                            <span className="truncate">{Voice ? Voice.name : "انتخاب فایل"}</span>
                        </label>
                </div>
            }
        </div>
    );
};

export default Input;
