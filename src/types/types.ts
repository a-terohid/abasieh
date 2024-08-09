import { ROLE } from "./enums";

export interface User  {
    email : string,
    password : string,
    role : ROLE
}

export type AuthType = {
    email : string,
    password : string,
}


export type InputType = {
    value : string,
    label : string,
    changeHandler : Function,
    type : string,
    name : string,
    textarea: boolean;
}