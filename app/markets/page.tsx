"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Search, TrendingUp, TrendingDown, Loader2, ArrowLeft } from "lucide-react";

interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
}

export default function MarketsPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // دریافت ۵۰ ارز برتر (می‌توانیم به ۱۰۰ تغییر دهیم)
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 50, 
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
        setFilteredCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // هندل کردن جستجو (فیلتر کردن لیست)
  useEffect(() => {
    const result = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(result);
  }, [search, coins]);

  const formatDollar = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4 sm:px-8 relative">
      {/* بک‌گراند نوری */}
      <div className="absolute top-20 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="container mx-auto">
        
        {/* هدر و باکس جستجو */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="text-center md:text-right">
            <h1 className="text-3xl font-bold text-white mb-2 md:border-r-4 md:border-emerald-500 md:pr-4">
              بازار ارزهای دیجیتال
            </h1>
            <p className="text-slate-400 text-sm">
              بررسی لحظه‌ای قیمت ۵۰ ارز برتر بازار جهانی
            </p>
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute right-4 top-3.5 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="جستجو (مثال: Bitcoin)" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pr-12 pl-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-all text-right"
            />
          </div>
        </div>

        {/* جدول ارزها */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-80 gap-4">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-slate-400">در حال دریافت لیست ارزها...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead className="bg-slate-800/80 text-slate-400 text-sm uppercase">
                  <tr>
                    <th className="py-4 px-6 text-center w-16">#</th>
                    <th className="py-4 px-6">نام ارز</th>
                    <th className="py-4 px-6 text-left">قیمت</th>
                    <th className="py-4 px-6 text-center">تغییر ۲۴h</th>
                    <th className="py-4 px-6 text-left hidden md:table-cell">ارزش بازار</th>
                    <th className="py-4 px-6 text-left hidden lg:table-cell">حجم معاملات</th>
                    <th className="py-4 px-6 text-center">عملیات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {filteredCoins.map((coin) => {
                     const isPositive = coin.price_change_percentage_24h >= 0;
                     return (
                      <tr key={coin.id} className="hover:bg-slate-800/40 transition-colors group">
                        <td className="py-4 px-6 text-center text-slate-500 font-mono text-sm">
                          {coin.market_cap_rank}
                        </td>
                        <td className="py-4 px-6">
                          <Link href={`/markets/${coin.id}`} className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
                            <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                            <div className="flex flex-col">
                              <span className="font-bold">{coin.name}</span>
                              <span className="text-xs text-slate-500 uppercase">{coin.symbol}</span>
                            </div>
                          </Link>
                        </td>
                        <td className="py-4 px-6 text-left font-mono font-medium">
                          {formatDollar(coin.current_price)}
                        </td>
                        <td className="py-4 px-6">
                          <div className={`flex items-center justify-center gap-1 ${isPositive ? "text-emerald-400" : "text-rose-500"}`}>
                            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                            <span className="font-bold dir-ltr">
                              {coin.price_change_percentage_24h.toFixed(2)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-left text-slate-400 text-sm hidden md:table-cell dir-ltr font-mono">
                          ${coin.market_cap.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-left text-slate-400 text-sm hidden lg:table-cell dir-ltr font-mono">
                          ${coin.total_volume.toLocaleString()}
                        </td>
                        <td className="py-4 px-6 text-center">
                          <Link href={`/markets/${coin.id}`} className="inline-flex items-center gap-1 text-xs bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white px-3 py-1.5 rounded-lg transition-all border border-emerald-500/20 hover:border-emerald-500">
                            تحلیل و خرید
                            <ArrowLeft className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                     );
                  })}
                </tbody>
              </table>
              {filteredCoins.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                   متاسفانه ارزی با این نام پیدا نشد.
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}