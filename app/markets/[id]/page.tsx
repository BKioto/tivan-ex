"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { 
  ArrowRight, Loader2, TrendingUp, TrendingDown, 
  Activity, Globe, Shield 
} from "lucide-react";
import TradingChart from "@/components/market/TradingChart"; // 👈 ایمپورت نمودار جدید

interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
    circulating_supply: number;
  };
  links: { homepage: string[] };
}

export default function CoinPage() {
  const params = useParams();
  const coinId = params.id as string;

  const [coin, setCoin] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!coinId) return;

    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}`,
          {
            params: {
              localization: false,
              tickers: false,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
          }
        );
        setCoin(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin details:", error);
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [coinId]);

  const formatDollar = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(val);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 gap-4">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-slate-400 animate-pulse">در حال بارگذاری اطلاعات بازار...</p>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
        <p>اطلاعات یافت نشد.</p>
        <Link href="/" className="text-emerald-400 mt-4 hover:underline">بازگشت به خانه</Link>
      </div>
    );
  }

  const isPositive = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 px-4 sm:px-8 relative overflow-hidden">
      
      {/* بک‌گراند نوری */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        
        {/* هدر صفحه: دکمه بازگشت */}
        <div className="flex items-center gap-2 mb-8 text-slate-400 hover:text-white transition-colors w-fit">
            <ArrowRight className="w-5 h-5" />
            <Link href="/">بازگشت به لیست</Link>
        </div>

        {/* کارت اصلی اطلاعات */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* ستون راست: اطلاعات اصلی و نمودار */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* هدر ارز */}
            <div className="flex items-center gap-6 bg-slate-900/50 p-6 rounded-3xl border border-slate-800 backdrop-blur-md">
              <img src={coin.image.large} alt={coin.name} className="w-20 h-20 drop-shadow-2xl" />
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  {coin.name}
                  <span className="text-sm bg-slate-800 text-slate-400 px-3 py-1 rounded-full uppercase border border-slate-700">
                    {coin.symbol}
                  </span>
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-3xl font-mono text-emerald-400 font-bold">
                        {formatDollar(coin.market_data.current_price.usd)}
                    </span>
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                        {isPositive ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
                        <span className="font-bold dir-ltr">{coin.market_data.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                </div>
              </div>
            </div>

            {/* 👈 نمودار ترید واقعی (جایگزین باکس قبلی) */}
            <div className="w-full">
               <TradingChart coinId={coinId} />
            </div>

            {/* توضیحات ارز */}
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-4 border-r-4 border-emerald-500 pr-3">درباره {coin.name}</h3>
                <p className="text-slate-400 leading-8 text-justify opacity-80" dangerouslySetInnerHTML={{ __html: coin.description.en ? coin.description.en.slice(0, 600) + "..." : "توضیحات در دسترس نیست." }} />
            </div>

          </div>

          {/* ستون چپ: آمار و دکمه خرید */}
          <div className="space-y-6">
            
            {/* باکس خرید/فروش سریع */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 p-6 rounded-3xl border border-slate-700 shadow-2xl">
                <h3 className="text-white font-bold mb-6 text-lg">معامله سریع</h3>
                <div className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-400 mb-1">
                        <span>موجودی کیف پول:</span>
                        <span>0 USDT</span>
                    </div>
                    <div className="relative">
                        <input type="number" placeholder="0.00" className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-4 text-white text-left font-mono focus:border-emerald-500 focus:outline-none transition-colors" />
                        <span className="absolute right-4 top-4 text-slate-500 font-bold">USDT</span>
                    </div>
                    <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                        خرید {coin.symbol.toUpperCase()}
                    </button>
                    <button className="w-full bg-slate-700 hover:bg-rose-500 hover:text-white text-slate-300 font-bold py-4 rounded-xl transition-all border border-slate-600">
                        فروش {coin.symbol.toUpperCase()}
                    </button>
                </div>
            </div>

            {/* آمار بازار */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    آمار بازار
                </h3>
                
                <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">ارزش بازار</span>
                    <span className="text-white font-mono text-sm">{formatDollar(coin.market_data.market_cap.usd)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">حجم ۲۴ ساعته</span>
                    <span className="text-white font-mono text-sm">{formatDollar(coin.market_data.total_volume.usd)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-slate-800">
                    <span className="text-slate-500 text-sm">بالاترین (24h)</span>
                    <span className="text-emerald-400 font-mono text-sm">{formatDollar(coin.market_data.high_24h.usd)}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                    <span className="text-slate-500 text-sm">پایین‌ترین (24h)</span>
                    <span className="text-rose-400 font-mono text-sm">{formatDollar(coin.market_data.low_24h.usd)}</span>
                </div>
            </div>

            {/* لینک‌های مفید */}
            <div className="bg-slate-900/50 p-6 rounded-3xl border border-slate-800">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-500" />
                    اطلاعات بیشتر
                </h3>
                {coin.links.homepage[0] && (
                    <a href={coin.links.homepage[0]} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 hover:bg-slate-800 transition-colors text-slate-300 text-sm mb-2">
                        <span>وبسایت رسمی</span>
                        <ArrowRight className="w-4 h-4 rotate-180" />
                    </a>
                )}
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 text-slate-300 text-sm">
                    <span className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        امنیت
                    </span>
                    <span className="text-green-400 text-xs">تایید شده</span>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}