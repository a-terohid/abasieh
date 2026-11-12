import { toPlain } from "@/utils/toPlain";
import Save from "@/models/save";
import Yearpage from "@/template/Yearpage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | سال ها",
    description: "قسمت سال های پنل ادمین هییت سقایی عباسیه جولان",
    keywords: "پنل ادمین, سال ها, هییت سقایی عباسیه جولان",
};

const page = async () => {

    await connectDB()

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const Years = [...(save?.Years ?? [])].sort((a:string, b:string) => parseInt(a) - parseInt(b));

    return ( <Yearpage Years={toPlain(Years)} /> );
};

export default page;