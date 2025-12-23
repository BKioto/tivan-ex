import Link from "next/link";
import { ArrowLeft, ShieldCheck, Zap, BarChart3, Lock } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      
      {/* 1. پس‌زمینه نوری (Background Glows) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* 2. ستون سمت راست: متن و دکمه‌ها */}
        <div className="flex flex-col gap-6 text-right z-10">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit self-start sm:self-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-400 text-xs font-bold tracking-wide">
              پلتفرم معاملاتی نسل ۳
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-white">
            فراتر از یک <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-emerald-400 to-blue-500">
              صرافی ارز دیجیتال
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg sm:text-xl leading-relaxed max-w-lg">
            در <span className="text-emerald-400 font-bold">تیوان اکس</span>، سرعت نور و امنیت سایبری در کلاس جهانی را تجربه کنید.
            پلتفرمی برای حرفه‌ای‌ها، با زیرساخت غیرمتمرکز و شفاف.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Link 
              href="/register" 
              className="group relative flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
            >
              شروع قدرتمند
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              href="/markets" 
              className="flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white px-8 py-4 rounded-xl font-medium transition-all"
            >
              مشاهده بازار
            </Link>
          </div>

          {/* تیک‌های اعتماد */}
          <div className="flex flex-wrap gap-4 mt-8 pt-8 border-t border-slate-800/50 text-xs text-slate-500">
            <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                تضمین امنیت دارایی
            </span>
            <span className="flex items-center gap-1">
                <Lock className="w-4 h-4 text-emerald-500" />
                رمزنگاری پیشرفته
            </span>
            <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-emerald-500" />
                تراکنش آنی
            </span>
          </div>
        </div>

        {/* 3. ستون سمت چپ: تصویر گرافیکی (پنل ترید نمادین) */}
        <div className="relative hidden lg:block z-10">
          {/* کارت اصلی شیشه‌ای */}
          <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl transform rotate-y-12 hover:rotate-0 transition-all duration-700">
            
            {/* هدر کارت */}
            <div className="flex justify-between items-center mb-6 border-b border-slate-700/50 pb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-xs text-slate-500 font-mono">BTC/USDT - Tivan Pro</span>
            </div>

            {/* محتوای کارت (شبیه‌سازی چارت و اعداد) */}
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400">قیمت بیت‌کوین</p>
                  <h3 className="text-3xl font-mono text-white">$۹۴,۵۲۰.۰۰</h3>
                </div>
                <span className="text-emerald-400 text-sm font-bold bg-emerald-500/10 px-2 py-1 rounded">+۲.۴٪</span>
              </div>
              
              {/* نمودار ساختگی با CSS */}
              <div className="h-32 w-full flex items-end justify-between gap-1 opacity-80">
                {[40, 60, 45, 70, 50, 80, 65, 90, 75, 100].map((h, i) => (
                  <div 
                    key={i} 
                    className="w-full bg-emerald-500/20 hover:bg-emerald-500 rounded-t-sm transition-all"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
                  <ShieldCheck className="text-blue-400 w-5 h-5" />
                  <div className="text-xs">
                    <p className="text-white">امنیت فضایی</p>
                    <p className="text-slate-500">ذخیره‌سازی سرد</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-3 rounded-lg flex items-center gap-3">
                  <Zap className="text-yellow-400 w-5 h-5" />
                  <div className="text-xs">
                    <p className="text-white">مچینگ سریع</p>
                    <p className="text-slate-500">بدون تاخیر</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* المنت‌های شناور پشت کارت */}
          <div className="absolute -top-10 -right-10 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl animate-bounce duration-[3000ms]">
            <BarChart3 className="text-emerald-400 w-8 h-8" />
          </div>
        </div>

      </div>
    </section>
  );
}