"use client";

import { useEffect, useRef, useState } from "react";
import { 
  createChart, 
  ColorType, 
  CrosshairMode, 
  IChartApi, 
  CandlestickSeries // 👈 این کلاس جدید اضافه شد برای نسخه 5
} from "lightweight-charts";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface TradingChartProps {
  coinId: string;
}

export default function TradingChart({ coinId }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // 1. تنظیمات اولیه چارت
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#94a3b8", // slate-400
      },
      grid: {
        vertLines: { color: "#1e293b" }, // slate-800
        horzLines: { color: "#1e293b" },
      },
      width: chartContainerRef.current.clientWidth,
      height: 400,
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: "#334155",
      },
      timeScale: {
        borderColor: "#334155",
        timeVisible: true,
      },
    });

    chartRef.current = chart;

    // 2. ساخت سری کندل‌ها (روش جدید نسخه 5)
    // به جای addCandlestickSeries از addSeries استفاده می‌کنیم
    const mainSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981", // Emerald-500
      downColor: "#f43f5e", // Rose-500
      borderVisible: false,
      wickUpColor: "#10b981",
      wickDownColor: "#f43f5e",
    });

    // 3. دریافت دیتا
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc`,
          {
            params: {
              vs_currency: "usd",
              days: "30", // دیتای ۳۰ روزه
            },
          }
        );

        const formattedData = response.data.map((item: number[]) => ({
          time: item[0] / 1000,
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        mainSeries.setData(formattedData);
        chart.timeScale().fitContent();
        setLoading(false);
      } catch (err) {
        console.error("Chart Data Error:", err);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();

    // 4. ریسپانسیو بودن
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [coinId]);

  return (
    <div className="relative w-full h-[400px] bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden backdrop-blur-sm">
      
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 z-10">
          <Loader2 className="w-10 h-10 text-emerald-500 animate-spin mb-2" />
          <span className="text-slate-400 text-sm">در حال ترسیم نمودار...</span>
        </div>
      )}

      {error && !loading && (
        <div className="absolute inset-0 flex items-center justify-center text-rose-500 z-10">
          خطا در دریافت دیتای نمودار
        </div>
      )}

      <div ref={chartContainerRef} className="w-full h-full" />
      
      <div className="absolute top-4 left-4 pointer-events-none opacity-20">
        <span className="text-4xl font-black text-slate-700">TivanEx</span>
      </div>
    </div>
  );
}