import { toPlain } from "@/utils/toPlain";
import Save from "@/models/save";
import OldSlavesPage from "@/template/OldSlavesPage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پیر غلامان | هیئت سقایی عباسیه جولان",
    description: "در این بخش از سایت، پیر غلامان هیئت سقایی عباسیه جولان معرفی می‌شوند و می‌توانید با خدمات و سوابق آن‌ها آشنا شوید.",
    keywords: "پیر غلامان, هیئت سقایی عباسیه جولان, خدمات پیر غلامان, سوابق پیر غلامان, اعضای پیر غلامان",
    robots: "index, follow",
};

const page = async () => {

    await connectDB()

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const OldSlaves = save?.OldSlaves ?? []

    return ( <OldSlavesPage OldSlaves={toPlain(OldSlaves)} /> );
};

export default page;