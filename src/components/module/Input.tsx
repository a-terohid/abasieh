import { InputType } from "@/types/types";


const Input = ( { changeHandler , value, label , type , name , textarea = false  } : InputType ) => {

    return (
        <div className="flex flex-col gap-y-2 " >
            <label >{ label }</label>
            {
                textarea ? 
                    <textarea 
                    value={ value }
                    name={ name }  
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-4 rounded text-Dark py-2 pl-3 md:w-full md:h-[150px]  text-sm w-[200px] h-[100px] "  />
                : 
                    <input 
                    dir="ltr"
                    type={ type }
                    value={ value }
                    name={ name }  
                    onChange={ ( event ) => changeHandler( event ) }
                    className="ml-7 rounded text-Dark py-2 pl-3 w-full md:w-1/2 bg-secondary-gray  text-text-light focus:outline-none focus:ring-2 focus:ring-primary-red-2 ring-secondary-red-1"  /> 
            }
        </div>
    );
};

export default Input;