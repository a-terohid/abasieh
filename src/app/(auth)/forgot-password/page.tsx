import ForgotPassword from "@/template/ForgotPassword";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "src/components/lib/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "فراموشی رمز عبور | هیئت سقایی عباسیه جولان",
    robots: "noindex, nofollow",
};

const page = async () => {
    const session = await getServerSession( authOptions )
    if ( session ) redirect("/admin-panel")

    return ( <ForgotPassword /> );
};

export default page;
