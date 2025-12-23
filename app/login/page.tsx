"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, Wallet, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client"; // 👈 کلاینت سوپابیس

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // استیت‌های فرم
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. اعتبارسنجی ساده
    if (!email || !password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      setLoading(false);
      return;
    }

    try {
      // 2. ساخت کلاینت
      const supabase = createClient();

      // 3. درخواست ورود به سیستم
      const { error: supabaseError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (supabaseError) {
        throw new Error("ایمیل یا رمز عبور اشتباه است.");
      }

      // 4. موفقیت! رفتن به داشبورد
      router.push("/dashboard");
      router.refresh(); // رفرش برای آپدیت شدن وضعیت هدر و سایدبار

    } catch (err: any) {
      console.error("Login Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden">
      
      {/* پس‌زمینه نوری */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      {/* باکس شیشه‌ای ورود */}
      <div className="w-full max-w-md p-8 m-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-emerald-500 tracking-tight">
              تیوان اکس
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">خوش‌آمدید! 👋</h2>
          <p className="text-slate-400 text-sm">
            برای شروع معاملات، وارد حساب کاربری خود شوید.
          </p>
        </div>

        {/* نمایش خطا */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* ایمیل */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">ایمیل</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left dir-ltr"
              />
            </div>
          </div>

          {/* رمز عبور */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-slate-300">رمز عبور</label>
              <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                رمز عبور را فراموش کردید؟
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left dir-ltr"
              />
            </div>
          </div>

          {/* دکمه ورود */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                در حال ورود...
              </>
            ) : (
              <>
                ورود به حساب
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-slate-800 flex-1" />
          <span className="text-slate-500 text-xs">یا ادامه دهید با</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2 group">
          <Wallet className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
          اتصال کیف پول (Wallet)
        </button>

        <div className="mt-8 text-center text-sm text-slate-400">
          حساب کاربری ندارید؟ 
          <Link href="/register" className="text-emerald-400 font-bold hover:text-emerald-300 mr-1 transition-colors">
            ثبت‌نام کنید
          </Link>
        </div>

      </div>
    </div>
  );
}