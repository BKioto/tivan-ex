import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin, ChevronLeft, ShieldCheck, Library } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 text-sm">
      <div className="container mx-auto px-4 sm:px-8">
        
        {/* بخش بالایی: لوگو و ستون‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* ستون ۱: درباره ما */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                 <Image src="/logo.svg" alt="TivanEx" fill className="object-contain" />
              </div>
              <span className="text-2xl font-bold text-emerald-500 tracking-tight">
                تیوان اکس
              </span>
            </div>
            <p className="text-slate-400 leading-7 text-justify">
              تیوان اکس، پیشرو در ارائه خدمات نوین بلاک‌چین در ایران. 
              ما با بهره‌گیری از تکنولوژی‌های امنیتی روز دنیا و ذخیره‌سازی سرد، دارایی شما را تضمین می‌کنیم.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
              
              {/* لینک مخفی به صفحه همکاران (Partners) برای سئو */}
              <Link 
                href="/partners" 
                title="Partners & Projects"
                className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-600 hover:bg-emerald-600 hover:text-white transition-all opacity-70 hover:opacity-100"
              >
                <Library className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ستون ۲: دسترسی سریع */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-r-4 border-emerald-500 pr-3">دسترسی سریع</h3>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link href="/markets" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  بازار ارزهای دیجیتال
                </Link>
              </li>
              <li>
                <Link href="/trade" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  معامله حرفه‌ای
                </Link>
              </li>
              <li>
                <Link href="/register" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  ثبت‌نام و احراز هویت
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  کیف پول من
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون ۳: راهنما */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-r-4 border-emerald-500 pr-3">راهنما</h3>
            <ul className="space-y-4 text-slate-400">
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  کارمزد معاملات
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  امنیت حساب کاربری
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  سوالات متداول
                </Link>
              </li>
              <li>
                <Link href="#" className="flex items-center gap-2 hover:text-emerald-400 transition-colors">
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                  حریم خصوصی
                </Link>
              </li>
            </ul>
          </div>

          {/* ستون ۴: اطلاعات تماس */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-r-4 border-emerald-500 pr-3">تماس با ما</h3>
            <ul className="space-y-6 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-6 h-6 text-emerald-500 shrink-0" />
                <span className="leading-6">
                  تهران، سعادت‌آباد، بلوار فرهنگ، ساختمان تیوان، طبقه ۵
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="dir-ltr font-mono text-lg hover:text-white transition-colors cursor-pointer">
                  021 - 88 44 22 11
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                <span className="font-mono hover:text-white transition-colors cursor-pointer">
                  support@tivanex.com
                </span>
              </li>
              
              <li className="flex items-center gap-2 mt-4 text-xs text-emerald-500 bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4" />
                تضمین بالاترین امنیت
              </li>
            </ul>
          </div>

        </div>

        {/* بخش پایینی: کپی‌رایت */}
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>
            © ۱۴۰۳ تمامی حقوق برای صرافی <strong className="text-emerald-500">تیوان اکس</strong> محفوظ است.
          </p>
          <div className="flex gap-6">
            <span>Secure Connection (SSL)</span>
            <span>Version: 2.1.0 Pro</span>
          </div>
        </div>

      </div>
    </footer>
  );
}