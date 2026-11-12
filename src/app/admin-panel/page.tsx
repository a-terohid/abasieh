import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";

const page = async () => {

    await connectDB();
    const session = await getServerSession( authOptions )
    console.log(session);
    
    if ( !session ) redirect("/")

    return (
        <div className="state">
            <span className="state-mark" aria-hidden>✦</span>
            <h1 className="state-title">پنل ادمین</h1>
            <p className="state-text">برای مدیریت محتوا، یکی از بخش‌های منو را انتخاب کنید.</p>
        </div>
    );
};

export default page;
