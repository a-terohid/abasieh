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

export interface Ziartnameh {
    Title: string,
    Description : string,
    Text : Ziartnameh_text,
    Voice?: string | null
}

export type Ziartnameh_text_part = {
    Supplement ?: string
    Original: string
    Translation: string
}

export type Ziartnameh_text = Ziartnameh_text_part[]


export type adminLayoutProps ={
    children: React.ReactNode
    role: ROLE,
    email: string,
}


export interface Zekr {
    Title: string,
    Zekr_Text: Zekr_Text,
    Author : string,
    Year : string,
    Voice?: string | null
}

export type Zekr_Text = {
    FirstParagraph : Zekr_Text_Paragraph,
    SecondParagraph : Zekr_Text_Paragraph,
}

export type Zekr_Text_Paragraph = {
    Description : string,
    Zekr_text_p :  String[],
    hadith : string,
}

export interface Save {
    Years: String[]
};