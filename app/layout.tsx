import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer"; // 👈 ایمپورت فوتر جدید

const vazir = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
  variable: "--font-vazir",
});

export const metadata: Metadata = {
  title: "تیوان اکس | صرافی امن ارز دیجیتال",
  description: "تجربه سریع‌ترین و امن‌ترین معاملات ارز دیجیتال در ایران با تیوان اکس.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.className} antialiased bg-slate-950 text-slate-50 selection:bg-emerald-500/30 selection:text-emerald-200 flex flex-col min-h-screen`}>
        {/* هدر ثابت در بالا */}
        <Header /> 
        
        {/* محتوای متغیر صفحات (با flex-grow پر کردن فضا) */}
        <div className="flex-grow">
          {children}
        </div>

        {/* فوتر ثابت در پایین */}
        <Footer />
      </body>
    </html>
  );
}