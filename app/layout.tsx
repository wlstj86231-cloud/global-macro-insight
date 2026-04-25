import type { Metadata } from "next";
import { Inter, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterModal } from "@/components/ui/NewsletterModal";
import { Providers } from "./providers";
const sansFont = Inter({subsets:["latin"],variable:"--font-sans"});
const serifFont = Nanum_Myeongjo({weight:["400","700"],subsets:["latin"],variable:"--font-serif"});
const SITEE_NAME = "글로벌 매크로 인사이트";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL||"https://your-domain.com";
export const metadata:Metadata = {title:{default:SITEE_NAME,template:`%s | ${SITEE_NAME}`},robots:{index:true,follow:true}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return(<html lang="ko"><body className={`${sansFont.variable} ${serifFont.variable} font-sans antialiased`}><Providers><Header/><main className="flex-1 w-full">{children}</main><Footer/><NewsletterModal/></Providers></body></html>);
}
