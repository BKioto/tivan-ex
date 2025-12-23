"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, User, Gift, Check, Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client"; // 👈 ایمپورت کلاینت سوپابیس

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // استیت‌های فرم
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // 1. اعتبارسنجی اولیه
    if (!formData.email || !formData.password) {
      setError("لطفاً ایمیل و رمز عبور را وارد کنید.");
      setLoading(false);
      return;
    }
    if (formData.password.length < 6) {
      setError("رمز عبور باید حداقل ۶ کاراکتر باشد.");
      setLoading(false);
      return;
    }

    try {
      // 2. ساخت کلاینت سوپابیس
      const supabase = createClient();

      // 3. ارسال درخواست ثبت‌نام
      const { data, error: supabaseError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName, // ذخیره نام در متادیتای کاربر
            referral_code: formData.referralCode,
          },
        },
      });

      if (supabaseError) {
        throw new Error(supabaseError.message);
      }

      // 4. موفقیت! انتقال به داشبورد
      // نکته: اگر تایید ایمیل در سوپابیس فعال باشد، باید پیام "ایمیل خود را چک کنید" نمایش دهیم.
      // فعلا فرض می‌کنیم کاربر مستقیم وارد می‌شود.
      router.push("/dashboard");

    } catch (err: any) {
      console.error("Registration Error:", err);
      setError(err.message || "خطایی در ثبت‌نام رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 relative overflow-hidden py-10">
      
      {/* پس‌زمینه نوری */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      {/* باکس شیشه‌ای ثبت‌نام */}
      <div className="w-full max-w-lg p-8 m-4 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl">
        
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-4">
            <span className="text-2xl font-bold text-emerald-500 tracking-tight">
              تیوان اکس
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-white mb-2">ساخت حساب جدید 🚀</h2>
          <p className="text-slate-400 text-sm">
            به جمع ۵۰,۰۰۰ معامله‌گر حرفه‌ای بپیوندید.
          </p>
        </div>

        {/* نمایش خطا اگر وجود داشته باشد */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* نام و نام خانوادگی */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">نام کامل</label>
            <div className="relative">
              <User className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="مثال: علی محمدی" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-right"
              />
            </div>
          </div>

          {/* ایمیل */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">ایمیل</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="example@mail.com" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left dir-ltr"
              />
            </div>
          </div>

          {/* رمز عبور */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">رمز عبور</label>
            <div className="relative">
              <Lock className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="حداقل ۶ کاراکتر" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left dir-ltr"
              />
            </div>
          </div>

          {/* کد معرف */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              کد معرف 
              <span className="text-xs text-slate-500 font-normal">(اختیاری)</span>
            </label>
            <div className="relative">
              <Gift className="absolute right-3 top-3.5 text-slate-500 w-5 h-5" />
              <input 
                type="text" 
                value={formData.referralCode}
                onChange={(e) => setFormData({...formData, referralCode: e.target.value})}
                placeholder="Referral Code" 
                className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-10 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-left dir-ltr"
              />
            </div>
          </div>

          {/* دکمه ثبت‌نام */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-600/50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                در حال ساخت حساب...
              </>
            ) : (
              <>
                ساخت حساب کاربری
                <ArrowLeft className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          قبلاً ثبت‌نام کرده‌اید؟ 
          <Link href="/login" className="text-emerald-400 font-bold hover:text-emerald-300 mr-1 transition-colors">
            وارد شوید
          </Link>
        </div>

      </div>
    </div>
  );
}