"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, CreditCard, Loader2, CheckCircle, AlertTriangle } from "lucide-react";

export default function DepositPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("irt"); // irt یا usdt
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    if (!amount || Number(amount) <= 0) {
      alert("مبلغ نامعتبر است");
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      
      // 1. چک کردن لاگین بودن کاربر
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // 2. صدا زدن تابع امنیتی دیتابیس (RPC)
      // این تابع هم تراکنش می‌سازد و هم موجودی را آپدیت می‌کند
      const { error } = await supabase.rpc('deposit_funds', {
        amount: Number(amount),
        currency_type: currency
      });

      if (error) throw error;

      // 3. موفقیت
      setStatus("success");
      
      // انتقال به داشبورد بعد از 2 ثانیه
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);

    } catch (error: any) {
      console.error("Deposit Error:", error);
      setStatus("error");
      setErrorMessage(error.message || "خطایی در عملیات رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* افکت نوری */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        <button 
          className="flex items-center gap-2 mb-6 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm" 
          onClick={() => router.back()}
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت</span>
        </button>

        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-emerald-500" />
          افزایش موجودی
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          واریز آنی به کیف پول (شبیه‌ساز درگاه بانکی)
        </p>

        {status === "success" ? (
          <div className="text-center py-10 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 animate-pulse">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">پرداخت موفق!</h3>
            <p className="text-emerald-400 text-sm">حساب شما شارژ شد. انتقال به داشبورد...</p>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-6">
            
            {/* نمایش خطا */}
            {status === "error" && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                {errorMessage}
              </div>
            )}

            {/* انتخاب ارز */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">انتخاب ارز واریزی</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCurrency("irt")}
                  className={`py-3 rounded-xl border font-bold transition-all ${currency === "irt" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"}`}
                >
                  تومان (IRT)
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency("usdt")}
                  className={`py-3 rounded-xl border font-bold transition-all ${currency === "usdt" ? "bg-emerald-600 border-emerald-500 text-white" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600"}`}
                >
                  تتر (USDT)
                </button>
              </div>
            </div>

            {/* مبلغ */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">مبلغ واریزی</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="مثال: 1000000"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-4 pl-16 text-white text-xl font-bold placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none transition-colors text-left dir-ltr"
                />
                <span className="absolute left-4 top-4.5 text-slate-500 font-bold text-sm uppercase">
                  {currency === 'irt' ? 'تومان' : 'USDT'}
                </span>
              </div>
            </div>

            {/* دکمه پرداخت */}
            <button 
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال پردازش...
                </>
              ) : (
                <>
                  انتقال به درگاه پرداخت
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </>
              )}
            </button>

            <div className="text-center text-xs text-slate-500 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
              ⚠️ این یک درگاه آزمایشی است (Dev Mode).
              <br/>
              موجودی شما واقعاً در دیتابیس افزایش می‌یابد.
            </div>

          </form>
        )}

      </div>
    </div>
  );
}