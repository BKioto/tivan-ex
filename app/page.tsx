import Hero from "@/components/landing/Hero";
import MarketList from "@/components/landing/MarketList";
import Link from "next/link";
import { ShieldCheck, Zap, Cpu, Globe, ArrowLeft, Users, Layers, Lock } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-950 overflow-hidden">
      
      {/* 1. بخش هیرو (اصلاح شده در فایل بعدی) */}
      <Hero />

      {/* 2. نوار آمار (Stats Bar) - اعتماد سازی */}
      <section className="border-y border-white/5 bg-slate-900/30 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">+۵۰K</h3>
            <p className="text-slate-500 text-sm">معامله‌گر فعال</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-white mb-1">$۱۰M+</h3>
            <p className="text-slate-500 text-sm">حجم معاملات روزانه</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-emerald-400 mb-1">۰.۰۰٪</h3>
            <p className="text-slate-500 text-sm">کارمزد اولین معامله</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-400 mb-1">۲۴/۷</h3>
            <p className="text-slate-500 text-sm">پشتیبانی اختصاصی</p>
          </div>
        </div>
      </section>

      {/* 3. لیست قیمت‌های زنده */}
      <MarketList />
      
      {/* 4. بنر تبلیغاتی اول (Features) - چرا تیوان اکس؟ */}
      <section className="py-20 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
        
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              استانداردهای جدید در <span className="text-emerald-400">دنیای کریپتو</span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              ما در تیوان اکس، محدودیت‌های سنتی را کنار زده‌ایم. ترکیبی از سرعت نور در معاملات و امنیت غیرقابل نفوذ، برای کسانی که حرفه‌ای فکر می‌کنند.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* کارت ۱ */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-emerald-500/50 transition-all group">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">امنیت سایبری نظامی</h3>
              <p className="text-slate-400 text-sm leading-7">
                استفاده از پروتکل‌های رمزنگاری پیشرفته، کیف پول‌های سرد (Cold Storage) و معماری امنیتی Zero-Trust. دارایی شما در دژ مستحکم تیوان نگهداری می‌شود.
              </p>
            </div>

            {/* کارت ۲ */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">موتور مچینگ فراصوت</h3>
              <p className="text-slate-400 text-sm leading-7">
                هسته‌ی معاملاتی ما با قابلیت پردازش ۱۰۰,۰۰۰ تراکنش در ثانیه، تضمین می‌کند که سفارش شما بدون هیچ تاخیری (Zero Latency) و با بهترین قیمت بازار انجام شود.
              </p>
            </div>

            {/* کارت ۳ */}
            <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">احراز هویت هوشمند</h3>
              <p className="text-slate-400 text-sm leading-7">
                سیستم احراز هویت مبتنی بر هوش مصنوعی (AI)، فرآیند تایید حساب کاربری شما را در کمتر از ۵ دقیقه و بدون نیاز به کاغذبازی انجام می‌دهد.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. بنر گرافیکی بزرگ (دعوت به اقدام) */}
      <section className="py-10 px-4">
        <div className="container mx-auto">
          <div className="relative bg-gradient-to-r from-emerald-900/40 to-slate-900 border border-emerald-500/20 rounded-3xl p-10 md:p-16 overflow-hidden">
            {/* پترن پس‌زمینه */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div className="text-right">
                <span className="text-emerald-400 font-bold tracking-wider text-sm uppercase mb-2 block">شروع یک امپراتوری</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  پورتفوی رویایی خود را <br/> همین امروز بسازید
                </h2>
                <p className="text-slate-300 mb-8 max-w-md text-lg">
                  با ثبت‌نام در تیوان اکس، به جمع حرفه‌ای‌ترین تریدرهای ایران بپیوندید و از ابزارهای تحلیلی پیشرفته رایگان استفاده کنید.
                </p>
                <div className="flex gap-4">
                  <Link href="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                    ساخت حساب رایگان
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </div>
              </div>
              
              {/* تصویر انتزاعی سمت چپ */}
              <div className="hidden lg:flex justify-center relative">
                 <div className="relative w-80 h-80 bg-gradient-to-tr from-emerald-500 to-blue-600 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
                 <Globe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 text-slate-700 opacity-20 animate-spin-slow" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-2xl">
                    <ShieldCheck className="w-16 h-16 text-emerald-400" />
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. مراحل کار (How it works) */}
      <section className="py-20 bg-slate-900/20 border-y border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">مسیر شما تا <span className="text-blue-400">اولین معامله</span></h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* خط اتصال (فقط دسکتاپ) */}
            <div className="hidden md:block absolute top-12 left-20 right-20 h-0.5 bg-gradient-to-r from-transparent via-slate-700 to-transparent -z-10"></div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mb-6 shadow-xl relative z-10">
                <span className="text-4xl font-bold text-slate-700">1</span>
                <Users className="absolute w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ثبت‌نام سریع</h3>
              <p className="text-slate-400 text-sm px-8">فقط با یک ایمیل و رمز عبور، در کمتر از ۱ دقیقه حساب خود را ایجاد کنید.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-900 border border-emerald-500/30 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/10 relative z-10">
                <span className="text-4xl font-bold text-slate-700">2</span>
                <Layers className="absolute w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">واریز ریالی آنی</h3>
              <p className="text-slate-400 text-sm px-8">از طریق درگاه امن پرداخت، کیف پول خود را بدون کارمزد شارژ کنید.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center mb-6 shadow-xl relative z-10">
                <span className="text-4xl font-bold text-slate-700">3</span>
                <Zap className="absolute w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">شروع معامله</h3>
              <p className="text-slate-400 text-sm px-8">بیت‌کوین، تتر و ۵۰ ارز دیگر را با بهترین نرخ بازار معامله کنید.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. بخش سئو و توضیحات متنی (برای گوگل) */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-slate-900/30 rounded-3xl p-8 border border-slate-800/50">
          <h2 className="text-2xl font-bold text-white mb-6">صرافی ارز دیجیتال تیوان اکس؛ دروازه ورود به بازارهای جهانی</h2>
          <div className="text-slate-400 text-sm leading-8 text-justify space-y-4">
            <p>
              صرافی تیوان اکس (TivanEx) به عنوان یکی از پیشرفته‌ترین پلتفرم‌های تبادل رمزارز در ایران، بستری امن و سریع برای خرید و فروش بیت‌کوین (Bitcoin)، اتریوم (Ethereum)، تتر (Tether) و سایر ارزهای دیجیتال فراهم کرده است. ما با درک نیاز کاربران ایرانی، پلتفرمی را طراحی کرده‌ایم که علاوه بر رابط کاربری ساده، از ابزارهای ترید حرفه‌ای بهره می‌برد.
            </p>
            <p>
              <strong>چرا تیوان اکس را انتخاب کنیم؟</strong> برخلاف پلتفرم‌های سنتی، تیوان اکس بر پایه معماری امنیتی چندلایه طراحی شده است. دارایی‌های کاربران در کیف پول‌های سرد (Cold Wallets) نگهداری می‌شوند که دسترسی هکرها به آن‌ها عملاً غیرممکن است. همچنین، موتور معاملاتی قدرتمند ما قادر است هزاران تراکنش را در کسری از ثانیه پردازش کند، بنابراین شما هرگز فرصت‌های طلایی بازار را به دلیل کندی سیستم از دست نخواهید داد.
            </p>
            <p>
              ما متعهد هستیم که بهترین نرخ تتر و بیت‌کوین را با کمترین کارمزد در اختیار کاربران قرار دهیم. چه یک معامله‌گر حرفه‌ای (Scalper) باشید و چه یک سرمایه‌گذار بلندمدت (Hodler)، تیوان اکس تمامی ابزارهای لازم از جمله نمودارهای پیشرفته تریدینگ ویو، حد ضرر (Stop Loss) و سفارش‌گذاری محدود (Limit Order) را در اختیار شما قرار می‌دهد.
            </p>
          </div>
          
          {/* لینک‌های داخلی برای سئو */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-slate-800">
             <Link href="/markets" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">خرید بیت‌کوین</Link>
             <span className="text-slate-700">•</span>
             <Link href="/markets" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">قیمت لحظه‌ای تتر</Link>
             <span className="text-slate-700">•</span>
             <Link href="/markets" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">خرید اتریوم</Link>
             <span className="text-slate-700">•</span>
             <Link href="/register" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">صرافی امن ایرانی</Link>
          </div>
        </div>
      </section>

      {/* فضای خالی فوتر */}
      <div className="h-20"></div>

    </main>
  );
}