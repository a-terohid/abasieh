import localFont from "next/font/local";


export const Peyda = localFont({
    display: 'swap',
    variable: '--font-Peyda',
    src: [
        {
            path: "../../public/Fonts/Peyda/Peyda-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Peyda/Peyda-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Peyda/Peyda-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Peyda/Peyda-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Peyda/Peyda-ExtraBold.ttf",
            weight: "800",
            style: "normal",
        },
        {
            path: "../../public/Fonts/Peyda/Peyda-Black.ttf",
            weight: "900",
            style: "normal",
        },
    ]
})

export const FONTS = ` 

                        ${ Peyda.variable } 
                    `