"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { ArrowRight, Star, Share2, AlertTriangle, Loader2, ExternalLink, Activity } from "lucide-react";
import TradingChart from "@/components/market/TradingChart";

// تعریف تایپ برای دیتای کوین
interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  current_price: number;
  market_cap_rank: number;
  market_data: {
    current_price: { usd: number };
    price_change_percentage_24h: number;
    high_24h: { usd: number };
    low_24h: { usd: number };
    market_cap: { usd: number };
    total_volume: { usd: number };
    circulating_supply: number;
  };
  description: { en: string };
  links: { homepage: string[] };
}

export default function MarketDetailPage() {
  // در نکست ۱۵ و کلاینت کامپوننت‌ها، پارامترها رو اینطوری می‌گیریم
  const params = useParams();
  const id = params.id as string;

  const [coin, setCoin] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchCoinData = async () => {
      try {
        setLoading(true);
        // دریافت اطلاعات کامل ارز
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}`,
          {
            params: {
              localization: false,
              tickers: false,
              market_data: true,
              community_data: false,
              developer_data: false,
              sparkline: false,
            },
          }
        );
        setCoin(response.data);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("متاسفانه اطلاعات این ارز دریافت نشد. (محدودیت API)");
      } finally {
        setLoading(false);
      }
    };

    fetchCoinData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-slate-400 animate-pulse">در حال دریافت اطلاعات بازار...</p>
      </div>
    );
  }

  if (error || !coin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
        <div className="bg-rose-500/10 p-4 rounded-full mb-4">
            <AlertTriangle className="w-12 h-12 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">خطا در دریافت اطلاعات</h2>
        <p className="text-slate-400 mb-6">{error || "ارز مورد نظر پیدا نشد."}</p>
        <Link href="/markets" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 border border-emerald-500/30 px-6 py-2 rounded-xl hover:bg-emerald-500/10 transition-all">
          <ArrowRight className="w-4 h-4" />
          بازگشت به بازار
        </Link>
      </div>
    );
  }

  // محاسبه تغییر قیمت برای رنگ‌بندی
  const priceChange = coin.market_data.price_change_percentage_24h;
  const isPositive = priceChange >= 0;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl space-y-6">
        
        {/* هدر صفحه: دکمه بازگشت و عنوان */}
        <div className="flex items-center justify-between">
          <Link href="/markets" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowRight className="w-4 h-4" />
            بازگشت به لیست
          </Link>
          <div className="flex gap-2">
             <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-yellow-400 hover:border-yellow-500/50 transition-all">
                <Star className="w-5 h-5" />
             </button>
             <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all">
                <Share2 className="w-5 h-5" />
             </button>
          </div>
        </div>

        {/* بخش اطلاعات اصلی ارز */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* کارت سمت چپ: قیمت و لوگو */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px] -z-10" />
                    
                    <div className="flex items-center gap-4 mb-6">
                        <img 
                            src={coin.image.large} 
                            alt={coin.name} 
                            className="w-16 h-16 rounded-full shadow-lg shadow-black/50" 
                        />
                        <div>
                            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                                {coin.name}
                                <span className="text-sm font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded uppercase">
                                    {coin.symbol}
                                </span>
                            </h1>
                            <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                Rank #{coin.market_cap_rank}
                            </span>
                        </div>
                    </div>

                    <div className="mb-2">
                        <span className="text-slate-400 text-sm">قیمت لحظه‌ای</span>
                        <div className="flex items-end gap-3 mt-1">
                            <h2 className="text-4xl font-mono font-bold text-white tracking-tight">
                                ${coin.market_data.current_price.usd.toLocaleString()}
                            </h2>
                        </div>
                    </div>

                    <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                        <Activity className="w-4 h-4" />
                        {isPositive ? '+' : ''}{priceChange.toFixed(2)}%
                        <span className="text-[10px] opacity-70 mr-1">(۲۴ ساعت)</span>
                    </div>
                </div>

                {/* کارت آمار */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 space-y-4">
                    <h3 className="text-white font-bold mb-4 border-r-4 border-blue-500 pr-3">آمار بازار</h3>
                    
                    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                        <span className="text-slate-400 text-sm">ارزش بازار (Cap)</span>
                        <span className="text-white font-mono text-sm">${coin.market_data.market_cap.usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                        <span className="text-slate-400 text-sm">حجم معاملات (24h)</span>
                        <span className="text-white font-mono text-sm">${coin.market_data.total_volume.usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
                        <span className="text-slate-400 text-sm">بالاترین قیمت (24h)</span>
                        <span className="text-white font-mono text-sm">${coin.market_data.high_24h.usd.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                        <span className="text-slate-400 text-sm">پایین‌ترین قیمت (24h)</span>
                        <span className="text-white font-mono text-sm">${coin.market_data.low_24h.usd.toLocaleString()}</span>
                    </div>
                </div>

                {/* دکمه اکشن */}
                <Link href="/trade" className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white text-center font-bold py-4 rounded-xl shadow-lg shadow-emerald-500/20 transition-all">
                    معامله {coin.symbol.toUpperCase()}
                </Link>
            </div>

            {/* بخش سمت راست: نمودار و توضیحات */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* نمودار */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-1 overflow-hidden h-[450px]">
                     <TradingChart coinId={coin.id} />
                </div>

                {/* درباره ارز */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-bold border-r-4 border-purple-500 pr-3">درباره {coin.name}</h3>
                        {coin.links.homepage[0] && (
                            <a 
                                href={coin.links.homepage[0]} 
                                target="_blank" 
                                className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300"
                            >
                                وب‌سایت رسمی <ExternalLink className="w-3 h-3" />
                            </a>
                        )}
                    </div>
                    <div className="text-slate-400 text-sm leading-8 text-justify">
                        {coin.description.en ? (
                            <p dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
                        ) : (
                            <p>توضیحات فارسی برای این ارز در دسترس نیست.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}