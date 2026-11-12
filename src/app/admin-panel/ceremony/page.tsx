import { toPlain } from "@/utils/toPlain";
import Ceremony from "@/models/cermony";
import CermonyAdminpage from "@/template/CermonyAdminpage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | مراسم‌ها",
    description: "قسمت مدیریت مراسم‌ها در پنل ادمین هییت سقایی عباسیه جولان",
    keywords: "پنل ادمین, مراسم‌ها, هییت سقایی عباسیه جولان",
};
  

const page = async () => {

    await connectDB()

    const ceremonies = await Ceremony.find()

    return ( <CermonyAdminpage ceremonies={toPlain(ceremonies)} /> );
};

export default page;