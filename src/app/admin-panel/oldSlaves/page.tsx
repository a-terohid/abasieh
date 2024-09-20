import Save from "@/models/save";
import OldSlavesAdminpage from "@/template/OldSlavesAdminpage";
import connectDB from "@/utils/connectDB";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "پنل ادمین | پیر غلام‌ها",
    description: "افراد پیر غلام در پنل ادمین هیئت سقایی عباسیه جولان",
    keywords: "پنل ادمین, پیر غلام‌ها, هیئت سقایی عباسیه جولان",
};


const page = async () => {

    await connectDB()

    const save  = await Save.findOne({ _id : process.env.SAVE_DATA_BASE_ID })
    const OldSlaves = save.OldSlaves

    return ( <OldSlavesAdminpage OldSlaves={OldSlaves} />);
};

export default page;