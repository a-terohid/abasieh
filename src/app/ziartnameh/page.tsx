import { toPlain } from "@/utils/toPlain";
import Ziartnameh from "@/models/ziaratnameh";
import ZiartnamehHomePage from "@/template/ZiartnamehHomePage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "زیارت‌نامه‌های اهل بیت (ع) | دسترسی آسان به متون مقدس",
  description: "مجموعه‌ای از زیارت‌نامه‌های معتبر و مستند از اهل بیت (ع) شامل زیارت عاشورا، زیارت جامعه کبیره، زیارت امام حسین (ع) و دیگر زیارت‌نامه‌های مشهور به همراه ترجمه و متن کامل. مناسب برای زائران و علاقمندان به متون دینی.",
  keywords: "زیارت‌نامه اهل بیت, زیارت عاشورا, زیارت جامعه کبیره, زیارت امام حسین, زیارت‌نامه امام رضا, متون مقدس, دعاهای دینی, زیارت‌نامه آنلاین",
  robots: "index, follow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};
  

const page = async () => {

    await connectDB()

    const ziartnameh = await Ziartnameh.find()
    

    return ( <ZiartnamehHomePage ziartnameh={toPlain(ziartnameh)} /> );
};

export default page;