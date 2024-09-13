import ContactUsPage from "@/template/ContactUsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "تماس با ما | هیئت سقایی عباسیه جولان",
    description: "در این بخش از سایت می‌توانید با ما در تماس باشید و سوالات یا نظرات خود را با هیئت سقایی عباسیه جولان در میان بگذارید.",
    keywords: "تماس با ما, هیئت سقایی عباسیه جولان, ارتباط با هیئت, تماس با هیئت",
    robots: "index, follow",
};

const page = () => {
    return ( <ContactUsPage /> );
};

export default page;