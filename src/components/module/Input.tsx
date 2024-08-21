import { InputType } from "@/types/types";



const Input = ( { changeHandler , value, label , type , name , textarea = false, Voice , ResetVoice  } : InputType ) => {

    return (
        <div className="flex flex-col gap-y-2 " >
            <label >{ label }</label>
            {
                textarea ? 
                    <textarea 
                    value={ value }
                    name={ name }  
                    rows={5}
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"  /> 
                : 
                  type !== "file" ? 
                    <input 
                    type={ type }
                    value={  value }
                    name={ name }  
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"  /> 
                :  <div className="mt-3">
                        <input 
                        type={ type }
                        id="fileInput"
                        name={ name }  
                        onChange={ ( event ) => changeHandler( event ) }
                        className="ml-7 drop-shadow-md rounded text-Dark py-2 pr-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"
                        style={{ display: 'none' }} />
                        <label htmlFor="fileInput" className=" bg-primary-green-1 text-white rounded md:w-1/2 py-2 px-3" >
                            {Voice ? Voice.name : "انتخاب فایل"}
                        </label>
                </div>
            
                
            }
        </div>
    );
};

export default Input;