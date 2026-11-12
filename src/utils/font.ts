import localFont from "next/font/local";
import { Noto_Naskh_Arabic } from "next/font/google";

// Persian UI + body text: Peyda (existing project asset), served as WOFF2.
export const Peyda = localFont({
    display: 'swap',
    variable: '--font-Peyda',
    src: [
        { path: "../../public/Fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Regular.woff2", weight: "400", style: "normal" },
        { path: "../../public/Fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Medium.woff2", weight: "500", style: "normal" },
        { path: "../../public/Fonts/Peyda/PeydaWeb/woff2/PeydaWeb-SemiBold.woff2", weight: "600", style: "normal" },
        { path: "../../public/Fonts/Peyda/PeydaWeb/woff2/PeydaWeb-Bold.woff2", weight: "700", style: "normal" },
        { path: "../../public/Fonts/Peyda/PeydaWeb/woff2/PeydaWeb-ExtraBold.woff2", weight: "800", style: "normal" },
    ]
})

// Arabic liturgical text (ziyarat, hadith): a Naskh face with full harakat support.
// Self-hosted at build time by next/font (no runtime request to Google).
export const NaskhArabic = Noto_Naskh_Arabic({
    subsets: ["arabic"],
    weight: ["400", "600"],
    display: "swap",
    variable: "--font-naskh",
})

export const FONTS = `${Peyda.variable} ${NaskhArabic.variable}`
