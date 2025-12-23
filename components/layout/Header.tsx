"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, User, LayoutDashboard, Loader2, LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 1. بررسی وضعیت اولیه کاربر
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    // 2. گوش دادن به تغییرات (ورود/خروج)
    // این باعث می‌شود اگر کاربر در تب دیگری لاگین کرد، هدر اینجا هم آپدیت شود
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6">
        
        {/* بخش راست: لوگو و منو */}
        <div className="flex items-center gap-8">
          {/* لوگو */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8">
               <Image 
                 src="/logo.svg" 
                 alt="لوگوی تیوان اکس" 
                 fill
                 className="object-contain group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all"
               />
            </div>
            <span className="text-xl font-bold text-emerald-500 tracking-tight">
              تیوان اکس
            </span>
          </Link>

          {/* منوی دسکتاپ */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/markets" className="hover:text-emerald-400 transition-colors">
              بازارها
            </Link>
            <Link href="/trade" className="hover:text-emerald-400 transition-colors">
              معامله حرفه‌ای
            </Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">
              آموزش
            </Link>
          </nav>
        </div>

        {/* بخش چپ: دکمه‌های متغیر (هوشمند) */}
        <div className="flex items-center gap-4">
          
          {loading ? (
            // حالت لودینگ (یک اسپینر کوچک)
            <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          ) : user ? (
            // 🟢 حالت لاگین شده (نمایش داشبورد)
            <div className="hidden md:flex items-center gap-4">
               <span className="text-sm text-slate-400 font-mono hidden lg:block">
                 {user.email?.split('@')[0]}
               </span>
               <Link 
                href="/dashboard" 
                className="flex items-center gap-2 rounded-xl bg-emerald-600/10 border border-emerald-500/20 px-5 py-2.5 text-sm font-bold text-emerald-400 hover:bg-emerald-600 hover:text-white hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                داشبورد من
              </Link>
            </div>
          ) : (
            // 🔴 حالت مهمان (نمایش ورود/ثبت‌نام)
            <div className="hidden md:flex items-center gap-4">
              <Link 
                href="/login" 
                className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                <LogIn className="w-4 h-4" />
                ورود
              </Link>
              <Link 
                href="/register" 
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                ثبت‌نام رایگان
              </Link>
            </div>
          )}

          {/* دکمه منوی موبایل (برای موبایل همیشه هست ولی محتواش رو بعدا میشه هوشمند کرد) */}
          <button className="md:hidden text-slate-300 hover:text-white p-2">
            <Menu className="h-6 w-6" />
          </button>
        </div>

      </div>
    </header>
  );
}