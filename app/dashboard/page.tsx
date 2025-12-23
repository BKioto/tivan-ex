"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { createClient } from "@/utils/supabase/client";
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, History, 
  LogOut, Loader2, User, RefreshCw, ChevronLeft 
} from "lucide-react";

// اینترفیس‌ها برای تایپ‌اسکریپت
interface Asset {
  id: string;
  symbol: string;
  amount: number;
  priceInToman: number;
  valueInToman: number;
}

interface Transaction {
  id: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  currency: string;
  status: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [totalBalanceToman, setTotalBalanceToman] = useState(0);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userName, setUserName] = useState("کاربر");

  // قیمت فرضی تتر (در نسخه نهایی می‌تونیم از API بگیریم)
  const USDT_PRICE = 60000;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      // 1. چک کردن وضعیت کاربر
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      
      if (user.user_metadata.full_name) {
        setUserName(user.user_metadata.full_name);
      }

      // 2. دریافت کیف پول‌ها از دیتابیس
      const { data: wallets, error: walletError } = await supabase
        .from("wallets")
        .select("*")
        .order('balance', { ascending: false }); // دارایی‌های بیشتر اول باشن

      if (walletError) throw walletError;

      // 3. دریافت آخرین تراکنش‌ها (5 تای آخر)
      const { data: txs, error: txError } = await supabase
        .from("transactions")
        .select("*")
        .order('created_at', { ascending: false })
        .limit(5);

      if (txError) throw txError;
      setTransactions(txs || []);

      // 4. اگر کیف پولی نبود (نباید پیش بیاد چون تریگر ساختیم)، خالی برگرد
      if (!wallets || wallets.length === 0) {
        setLoading(false);
        return;
      }

      // 5. دریافت قیمت‌های جهانی کریپتو (برای محاسبه ارزش دارایی)
      const symbolMap: {[key: string]: string} = {
        'btc': 'bitcoin',
        'eth': 'ethereum',
        'usdt': 'tether',
        'irt': 'irt'
      };

      // لیست ارزهایی که کریپتو هستن (تومان و تتر نه)
      const cryptoIds = wallets
        .filter(w => w.currency !== 'irt' && w.currency !== 'usdt')
        .map(w => symbolMap[w.currency])
        .join(",");

      let prices: any = {};
      
      if (cryptoIds) {
        try {
            const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price`,
            { params: { ids: cryptoIds, vs_currencies: "usd" } }
            );
            prices = response.data;
        } catch (e) {
            console.error("CoinGecko Error (Using Fallback prices)", e);
        }
      }

      // 6. محاسبه ریاضی دارایی‌ها
      let totalToman = 0;

      const calculatedAssets = wallets.map(wallet => {
        let priceInUsd = 0;
        let priceInToman = 0;
        let valueInToman = 0;

        // منطق قیمت‌گذاری
        if (wallet.currency === 'irt') {
          priceInToman = 1;
          valueInToman = wallet.balance;
        } else if (wallet.currency === 'usdt') {
          priceInUsd = 1;
          priceInToman = USDT_PRICE;
          valueInToman = wallet.balance * USDT_PRICE;
        } else {
          const coinId = symbolMap[wallet.currency];
          priceInUsd = prices[coinId]?.usd || 0;
          priceInToman = priceInUsd * USDT_PRICE;
          valueInToman = wallet.balance * priceInToman;
        }

        totalToman += valueInToman;

        return {
          id: wallet.id,
          symbol: wallet.currency.toUpperCase(),
          amount: wallet.balance,
          priceInToman,
          valueInToman
        };
      });

      setAssets(calculatedAssets);
      setTotalBalanceToman(totalToman);
      setLoading(false);

    } catch (error) {
      console.error("Dashboard Error:", error);
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("fa-IR").format(Math.floor(num));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-28 pb-10 px-4 sm:px-8 relative">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* سایدبار (پروفایل) */}
        <aside className="lg:col-span-1 space-y-4">
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 shadow-xl sticky top-28">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white border border-slate-700">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white font-bold">{userName}</h3>
                <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">سطح ۱: احراز شده</span>
              </div>
            </div>
            
            <nav className="space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-emerald-600/10 text-emerald-400 rounded-xl font-medium border border-emerald-500/20">
                <Wallet className="w-5 h-5" />
                داشبورد
              </button>
              <button onClick={fetchData} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800/50 rounded-xl transition-all">
                <RefreshCw className="w-5 h-5" />
                بروزرسانی موجودی
              </button>
              <div className="h-px bg-slate-800 my-2" />
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
                <LogOut className="w-5 h-5" />
                خروج از حساب
              </button>
            </nav>
          </div>
        </aside>

        {/* محتوای اصلی */}
        <main className="lg:col-span-3 space-y-6">
          
          {/* 1. کارت موجودی کل */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 border border-slate-700 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -z-0" />
            
            <div className="relative z-10">
              <span className="text-slate-400 text-sm mb-2 block">ارزش کل دارایی‌ها (تخمین تومان)</span>
              <h1 className="text-4xl sm:text-5xl font-bold text-white font-mono tracking-tight mb-8">
                {formatNumber(totalBalanceToman)} <span className="text-lg text-slate-500 font-normal">تومان</span>
              </h1>

              <div className="flex flex-wrap gap-4">
                <Link href="/deposit" className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-500/20">
                  <ArrowDownLeft className="w-5 h-5" />
                  واریز وجه
                </Link>
                {/* دکمه برداشت که حالا لینک شده */}
                <Link href="/withdraw" className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold px-6 py-3 rounded-xl transition-all border border-slate-600">
                  <ArrowUpRight className="w-5 h-5" />
                  برداشت وجه
                </Link>
              </div>
            </div>
          </div>

          {/* 2. لیست کیف پول‌ها */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
            <h3 className="text-white font-bold text-lg border-r-4 border-emerald-500 pr-3 mb-6">
              کیف پول‌های من
            </h3>
            
            <div className="space-y-3">
              {assets.map((asset) => (
                <div key={asset.id} className="flex justify-between items-center bg-slate-950/50 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center font-bold text-slate-300 border border-slate-800 group-hover:border-emerald-500/50 transition-colors">
                      {asset.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{asset.symbol}</div>
                      <div className="text-xs text-slate-500 font-mono">موجودی: {asset.amount}</div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold font-mono">{formatNumber(asset.valueInToman)} <span className="text-xs text-slate-500 font-sans">تومان</span></div>
                    {asset.symbol !== 'IRT' && (
                        <div className="text-xs text-slate-500 font-mono mt-1">نرخ: {formatNumber(asset.priceInToman)}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. تاریخچه تراکنش‌ها (جدید) */}
          <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg border-r-4 border-emerald-500 pr-3">
                تراکنش‌های اخیر
                </h3>
                <Link href="#" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                    مشاهده همه
                    <ChevronLeft className="w-4 h-4" />
                </Link>
            </div>
            
            {transactions.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-sm bg-slate-950/30 rounded-xl border border-dashed border-slate-800">
                    <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    هنوز تراکنشی انجام نداده‌اید.
                </div>
            ) : (
                <div className="space-y-3">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center bg-slate-950/30 p-4 rounded-xl border border-slate-800/50">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                                    {tx.type === 'deposit' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                                </div>
                                <div>
                                    <div className="text-white text-sm font-bold">
                                        {tx.type === 'deposit' ? 'واریز' : 'برداشت'} {tx.currency === 'irt' ? 'تومان' : tx.currency.toUpperCase()}
                                    </div>
                                    <div className="text-xs text-slate-500 mt-1">
                                        {new Date(tx.created_at).toLocaleDateString('fa-IR')}
                                    </div>
                                </div>
                            </div>
                            <div className="text-left">
                                <div className={`font-mono font-bold dir-ltr ${tx.type === 'deposit' ? 'text-emerald-400' : 'text-slate-200'}`}>
                                    {tx.type === 'deposit' ? '+' : '-'}{formatNumber(tx.amount)}
                                </div>
                                <div className={`text-[10px] px-2 py-0.5 rounded-full inline-block mt-1 ${tx.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-500'}`}>
                                    {tx.status === 'success' ? 'موفق' : 'در حال انجام'}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}