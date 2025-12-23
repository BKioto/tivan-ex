"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { ArrowRight, Wallet, Loader2, CheckCircle, AlertTriangle, Send } from "lucide-react";

export default function WithdrawPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // استیت‌های فرم
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("irt"); // irt, usdt, btc
  const [address, setAddress] = useState(""); // شماره شبا یا آدرس ولت
  
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const supabase = createClient();
      
      // 1. فراخوانی تابع امنیتی دیتابیس
      const { data, error } = await supabase.rpc('withdraw_funds', {
        p_amount: Number(amount),
        p_currency: currency,
        p_address: address
      });

      if (error) throw error;

      // 2. بررسی نتیجه تابع
      if (data.status === 'error') {
        setStatus("error");
        setMessage(data.message);
      } else {
        setStatus("success");
        // بازگشت به داشبورد بعد از ۳ ثانیه
        setTimeout(() => router.push("/dashboard"), 3000);
      }

    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage("خطایی در ارتباط با سرور رخ داد.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* پس‌زمینه نوری */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10">
        
        <button 
          className="flex items-center gap-2 mb-6 text-slate-400 hover:text-white transition-colors cursor-pointer text-sm" 
          onClick={() => router.back()}
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به داشبورد</span>
        </button>

        <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <Wallet className="w-6 h-6 text-rose-500" />
          برداشت وجه
        </h2>
        <p className="text-slate-400 text-sm mb-8">
          انتقال دارایی به حساب بانکی یا کیف پول شخصی
        </p>

        {status === "success" ? (
          <div className="text-center py-10 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">درخواست ثبت شد!</h3>
            <p className="text-slate-400 text-sm px-4">
              برداشت شما در صف پردازش قرار گرفت و پس از تایید مدیریت واریز خواهد شد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-6">
            
            {status === "error" && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                {message}
              </div>
            )}

            {/* انتخاب نوع برداشت */}
            <div className="grid grid-cols-3 gap-2 bg-slate-950 p-1 rounded-xl">
               {['irt', 'usdt', 'btc'].map((c) => (
                 <button
                   key={c}
                   type="button"
                   onClick={() => setCurrency(c)}
                   className={`py-2 text-sm font-bold rounded-lg transition-all ${currency === c ? 'bg-slate-800 text-white shadow' : 'text-slate-500 hover:text-slate-300'}`}
                 >
                   {c.toUpperCase()}
                 </button>
               ))}
            </div>

            {/* آدرس مقصد */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">
                {currency === 'irt' ? 'شماره شبا (بدون IR)' : 'آدرس کیف پول مقصد'}
              </label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={currency === 'irt' ? "مثال: 1202..." : "مثال: TEx..."}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl py-3 px-4 text-white placeholder:text-slate-600 focus:border-rose-500 focus:outline-none transition-colors text-left dir-ltr"
              />
            </div>

            {/* مبلغ */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">مبلغ برداشت</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-4 pl-16 text-white text-xl font-bold focus:border-rose-500 focus:outline-none transition-colors text-left dir-ltr"
                />
                <span className="absolute left-4 top-4.5 text-slate-500 font-bold text-sm uppercase">
                  {currency.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-slate-500 text-right">
                کارمزد شبکه: {currency === 'irt' ? '۵,۰۰۰ تومان' : '۱.۰ USDT'}
              </p>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(244,63,94,0.3)] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  در حال ثبت...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  ثبت درخواست برداشت
                </>
              )}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}