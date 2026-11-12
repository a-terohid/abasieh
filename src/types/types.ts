import { ROLE, TRUSTEES_ROLE } from "./enums";

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
    textarea: boolean,
    Voice ?: any,
    ResetVoice ?: Function
    placeholder ?: string,
    inputMode ?: "text" | "numeric" | "email" | "tel",
}

export type TextZiartnamehInput = { 
    data : Ziartnameh,
    setData : Function
}

export interface Ziartnameh {
    Title: string,
    Description : string,
    Text : Ziartnameh_text,
    Voice?: string | null
    _id?: string
}

export type ZiartnamehCardProps = {
    ziartnameh: Ziartnameh;
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

export type TRUSTEES_PERSONE = { 
    fullName: string,
    phone: string,
    role : TRUSTEES_ROLE,
    img ?: string,
    _id ?: string
}

export type OLD_SLAVES = { 
    fullName: string,
    date: string,
    img ?: string,
    _id ?: string
}

export interface Save {
    Years: String[]
    Trustees : TRUSTEES_PERSONE[]
    OldSlaves : OLD_SLAVES[]
};

export interface Ceremony {
    title: string
    description: string
    date: string
    coverImage: string
    images : string[]
}


export type BlogPost = {
    title: string;
    content: RichTextNode[]; 
    author: string;
    thumbnailUrl?: string;  
};
  
export type RichTextNode = {
    type: string;
    children: RichTextNode[] | string;
    src?: string;  
    alt?: string;  
};