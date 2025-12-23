"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export default function MarketList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // بهینه سازی: دریافت فقط ۱۰ ارز برتر برای صفحه اصلی
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 10, // محدود کردن به ۱۰ آیتم
              page: 1,
              sparkline: true,
            },
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // آپدیت هر ۱ دقیقه
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const renderSparkline = (prices: number[], isPositive: boolean) => {
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min;
    const width = 120;
    const height = 40;
    
    const points = prices
      .map((price, index) => {
        const x = (index / (prices.length - 1)) * width;
        const y = height - ((price - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={isPositive ? "#10b981" : "#f43f5e"}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  return (
    <section className="w-full py-16 px-4 sm:px-8">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white border-r-4 border-emerald-500 pr-4">
            نبض بازار
            </h2>
            <Link href="/markets" className="text-emerald-400 hover:text-emerald-300 text-sm flex items-center gap-1">
                مشاهده همه
                <ArrowLeft className="w-4 h-4" />
            </Link>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-slate-400">در حال دریافت نرخ‌های لحظه‌ای...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-800/80 text-slate-400 text-sm uppercase">
                  <tr>
                    <th className="py-4 px-6 text-right">نام ارز</th>
                    <th className="py-4 px-6 text-left">قیمت (دلار)</th>
                    <th className="py-4 px-6 text-center">تغییر ۲۴ساعت</th>
                    <th className="py-4 px-6 text-center hidden md:table-cell">روند ۷ روزه</th>
                    <th className="py-4 px-6 text-left hidden lg:table-cell">ارزش بازار</th>
                    <th className="py-4 px-6 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {coins.map((coin) => {
                    const isPositive = coin.price_change_percentage_24h >= 0;
                    return (
                      <tr key={coin.id} className="hover:bg-slate-800/40 transition-colors group">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col">
                              <span className="font-bold text-white">{coin.name}</span>
                              <span className="text-xs text-slate-500 uppercase">{coin.symbol}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-left font-mono font-medium text-emerald-100">
                          {formatCurrency(coin.current_price)}
                        </td>
                        <td className="py-4 px-6">
                          <div className={`flex items-center justify-center gap-1 ${isPositive ? "text-emerald-400" : "text-rose-500"}`}>
                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="font-bold dir-ltr">
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden md:flex justify-center items-center">
                          <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                            {renderSparkline(coin.sparkline_in_7d.price, isPositive)}
                          </div>
                        </td>
                        <td className="py-4 px-6 text-left text-slate-400 text-sm hidden lg:table-cell dir-ltr">
                          ${coin.market_cap.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <button className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-all border border-emerald-500/20 hover:border-emerald-500">
                            معامله
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}