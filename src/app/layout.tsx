import type { Metadata, Viewport } from "next";
import { FONTS } from "@/utils/font";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import NextAuthProvider from '@/providers/NextAuthProvider'
import Layout from "@/layout/Layout";


export const metadata: Metadata = {
  title: "هیئت سقایی عباسیه جولان",
  description: "وب‌سایت هیئت سقایی عباسیه جولان همدان؛ ذکرهای سقایی، زیارت‌نامه‌ها، مراسم‌ها، پیرغلامان و هیئت امنا.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#121417" },
  ],
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="fa" dir="rtl" className={ FONTS } suppressHydrationWarning>
      <body>
        <NextAuthProvider>
          <ThemeProvider attribute="class">
            <Layout>
              {children}
            </Layout>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
