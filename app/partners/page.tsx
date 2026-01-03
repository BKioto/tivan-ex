// C:\projects\tivan-ex\app\partners\page.tsx

"use client";

import { 
  ExternalLink, 
  Code2, 
  ShoppingBag, 
  Truck, 
  Gem, 
  Briefcase, 
  Network, 
  ArrowRight,
  Bot,             // برای Mind Orbit
  Zap,             // برای Nexus Solana
  Shirt,           // برای Luxe Shop
  LayoutDashboard  // برای Alpha System
} from "lucide-react";
import Link from "next/link";

// لیست کامل همکاران و پروژه‌ها (۸ مورد)
const partners = [
  // 1. KiyaDev
  {
    id: 1,
    title: "کیا دِو | امپراتوری نرم‌افزار",
    description: "تیم توسعه‌دهنده نخبه در زمینه طراحی وب‌سایت‌های اختصاصی، اپلیکیشن‌های موبایل (Flutter & React Native)، بلاکچین و هوش مصنوعی.",
    features: ["توسعه دهنده اصلی تیوان", "بلاکچین و Web3", "هوش مصنوعی"],
    url: "https://kiyadev.ir", 
    icon: Code2,
    color: "text-blue-400",
    borderColor: "group-hover:border-blue-500/50",
    glow: "group-hover:shadow-blue-500/20"
  },
  // 2. Nexus Solana (New)
  {
    id: 2,
    title: "نکسوس سولانا | توکن‌ساز غیرمتمرکز",
    description: "اولین پلتفرم No-Code ساخت توکن روی شبکه سولانا. ایجاد ارز دیجیتال شخصی و میم‌کوین در کمتر از ۱ دقیقه با هزینه ناچیز و امنیت بلاکچینی.",
    features: ["ساخت توکن SPL", "شبکه پرسرعت سولانا", "بدون کدنویسی"],
    url: "https://nexus-solana-taupe.vercel.app",
    icon: Zap,
    color: "text-fuchsia-400", 
    borderColor: "group-hover:border-fuchsia-500/50",
    glow: "group-hover:shadow-fuchsia-500/20"
  },
  // 3. Mind Orbit (New)
  {
    id: 3,
    title: "مایند اوربیت | هوش مصنوعی فارسی",
    description: "دستیار هوشمند مبتنی بر مدل‌های پیشرفته زبانی. پاسخگویی به سوالات، تولید محتوا، کدنویسی و حل مسائل پیچیده با پشتیبانی کامل از زبان فارسی.",
    features: ["چت‌بات هوشمند", "تولید محتوا و کد", "مدل زبانی Gemini"],
    url: "https://mind-orbit-lyart.vercel.app",
    icon: Bot,
    color: "text-cyan-400",
    borderColor: "group-hover:border-cyan-500/50",
    glow: "group-hover:shadow-cyan-500/20"
  },
  // 4. Alpha System (New)
  {
    id: 4,
    title: "آلفا سیستم | داشبورد مدیریتی",
    description: "سامانه جامع مدیریت منابع سازمانی (ERP). مدیریت هوشمند پرسنل، حقوق و دستمزد، و کنترل پروژه‌ها با ابزارهای بصری و نمودارهای تحلیلی.",
    features: ["پنل مدیریت ERP", "مدیریت پروژه‌ها (Kanban)", "تحلیل داده‌ها"],
    url: "https://alpha-system-eight.vercel.app",
    icon: LayoutDashboard,
    color: "text-orange-400",
    borderColor: "group-hover:border-orange-500/50",
    glow: "group-hover:shadow-orange-500/20"
  },
  // 5. Luxe Shop (New)
  {
    id: 5,
    title: "لوکس شاپ | استایل و مد",
    description: "فروشگاه اینترنتی مدرن پوشاک و اکسسوری. تجربه خریدی لوکس با رابط کاربری مینیمال، سبد خرید هوشمند و فرآیند پرداخت آسان.",
    features: ["فروشگاه آنلاین مدرن", "مد و فشن", "تجربه کاربری عالی"],
    url: "https://luxe-shop-ten.vercel.app",
    icon: Shirt,
    color: "text-amber-400",
    borderColor: "group-hover:border-amber-500/50",
    glow: "group-hover:shadow-amber-500/20"
  },
  // 6. Coconut
  {
    id: 6,
    title: "فروشگاه آنلاین کوکونات",
    description: "بازار آنلاین میوه و پروتئین شهر پرند. خرید آنلاین تازه‌ترین محصولات با تحویل فوری درب منزل. تجربه‌ای راحت و سریع.",
    features: ["مارکت‌پلیس محلی", "لجستیک هوشمند", "تحویل فوری"],
    url: "https://cocodelivery.ir", 
    icon: Truck,
    color: "text-green-400",
    borderColor: "group-hover:border-green-500/50",
    glow: "group-hover:shadow-green-500/20"
  },
  // 7. Alef Gem
  {
    id: 7,
    title: "گالری جواهرات اَلِف جِم",
    description: "طراحی و ساخت جواهرات دست‌ساز با طلای ۱۸ عیار و سنگ‌های قیمتی اصل. ترکیب هنر مینیمال و مدرن برای خلق آثار ماندگار.",
    features: ["لوکس و فشن", "سنگ‌های قیمتی", "طراحی اختصاصی"],
    url: "https://alefgem.com", 
    icon: Gem,
    color: "text-purple-400",
    borderColor: "group-hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/20"
  },
  // 8. Soughat Shop
  {
    id: 8,
    title: "سوغات شاپ اینترنشنال",
    description: "اولین پلتفرم ارسال هدیه به ایران با پرداخت ارزی و کریپتو. پل ارتباطی ایرانیان خارج از کشور با عزیزانشان.",
    features: ["پرداخت کریپتو", "فین‌تک فرامرزی", "E-Commerce"],
    url: "https://soughat.shop", 
    icon: ShoppingBag,
    color: "text-rose-400",
    borderColor: "group-hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20"
  }
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-8 relative overflow-hidden" dir="rtl">
      
      {/* بک‌گراند نوری */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto max-w-6xl">
        
        {/* هدر صفحه */}
        <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors text-sm">
                <ArrowRight className="w-4 h-4" />
                بازگشت به خانه
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <Network className="text-emerald-500" />
                شبکه همکاران تجاری
            </h1>
            <p className="text-slate-400 max-w-2xl leading-8 text-lg">
                تیوان اکس بخشی از یک اکوسیستم بزرگتر است. در این بخش، مجموعه‌ای از پروژه‌های منتخب و کسب‌وکارهای معتبری که از زیرساخت‌های فنی یا مالی مشترک استفاده می‌کنند را معرفی می‌کنیم.
            </p>
        </div>

        {/* گرید کارت‌ها */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="dofollow" // 👈 مهم برای سئو: انتقال اعتبار دامین
              className={`group relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${partner.borderColor} ${partner.glow}`}
            >
              <div>
                {/* هدر کارت */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-2xl p-3 bg-slate-950 border border-slate-800 ${partner.color}`}>
                    <partner.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div className="rounded-full bg-slate-950 border border-slate-800 px-3 py-1 flex items-center gap-1">
                     <Briefcase size={12} className="text-slate-500" />
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Partner</span>
                  </div>
                </div>

                <h2 className="mb-3 text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {partner.title}
                </h2>
                
                <p className="text-sm leading-7 text-slate-400 mb-6 text-justify opacity-80 group-hover:opacity-100 transition-opacity">
                  {partner.description}
                </p>

                {/* تگ‌ها */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {partner.features.map((feature, idx) => (
                    <span key={idx} className="text-[11px] bg-slate-950/80 text-slate-500 border border-slate-800 px-2.5 py-1 rounded-lg">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* فوتر کارت */}
              <div className="mt-auto border-t border-slate-800 pt-4 flex items-center justify-between">
                <span className={`text-xs font-bold transition-colors ${partner.color}`}>
                  بازدید از وب‌سایت
                </span>
                <div className="flex items-center gap-1 text-slate-600 group-hover:text-white transition-colors">
                  <span className="text-xs font-mono hidden sm:inline-block">{partner.url.replace('https://', '')}</span>
                  <ExternalLink size={14} />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}