"use client"; // 👈 این خط برای دکمه‌های تعاملی الزامی است

import Link from "next/link";
import { Home, MoveLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      
      {/* افکت نوری پشت زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10" />

      {/* عدد 404 بزرگ */}
      <h1 className="text-[150px] font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-700 to-slate-900 leading-none select-none">
        404
      </h1>

      <div className="space-y-6 relative -mt-10">
        <h2 className="text-3xl font-bold text-white">
          مسیر را گم کرده‌اید؟ 🌌
        </h2>
        <p className="text-slate-400 max-w-md mx-auto leading-7">
          متاسفانه صفحه‌ای که به دنبال آن هستید در کهکشان تیوان اکس پیدا نشد. ممکن است آدرس تغییر کرده باشد یا حذف شده باشد.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
          >
            <Home className="w-5 h-5" />
            بازگشت به خانه
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-8 py-3 rounded-xl font-medium transition-all border border-slate-700"
          >
            <MoveLeft className="w-5 h-5" />
            بازگشت به قبل
          </button>
        </div>
      </div>

    </div>
  );
}