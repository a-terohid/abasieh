import ResetPassword from "@/template/ResetPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "تعیین رمز عبور جدید | هیئت سقایی عباسیه جولان",
    robots: "noindex, nofollow",
    // The token is in the URL: never leak it to other sites via the Referer header.
    referrer: "no-referrer",
};

const page = async ({ searchParams }: any) => {
    const { token } = await searchParams;
    return ( <ResetPassword token={ typeof token === "string" ? token : "" } /> );
};

export default page;
