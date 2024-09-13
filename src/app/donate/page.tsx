import DonatePage from "@/template/DonatePage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "کمک به هیئت | هیئت سقایی عباسیه جولان",
    description: "در این بخش از سایت می‌توانید با روش‌های مختلف کمک به هیئت سقایی عباسیه جولان آشنا شوید و از طریق پشتیبانی مالی یا معنوی از فعالیت‌های هیئت حمایت کنید.",
    keywords: "کمک به هیئت, حمایت از هیئت, پشتیبانی مالی, هیئت سقایی عباسیه جولان, کمک‌های مردمی",
    robots: "index, follow",
};

const page = () => {
    return ( <DonatePage /> );
};

export default page;