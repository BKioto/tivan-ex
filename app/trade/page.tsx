"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { ArrowUp, ArrowDown, Wallet, History, Loader2, Trash2 } from "lucide-react";
import TradingChart from "@/components/market/TradingChart";

// دیتای ساختگی برای اردر بوک (چون هنوز موتور مچینگ نداریم، این بخش دکوری میمونه فعلا)
const ORDER_BOOK_MOCK = {
  asks: [ 
    { price: 64250.50, amount: 0.542 },
    { price: 64249.00, amount: 1.200 },
    { price: 64248.50, amount: 0.050 },
    { price: 64248.00, amount: 0.850 },
    { price: 64247.50, amount: 2.100 },
  ],
  bids: [ 
    { price: 64245.00, amount: 1.500 },
    { price: 64244.50, amount: 0.300 },
    { price: 64244.00, amount: 5.000 },
    { price: 64243.50, amount: 0.120 },
    { price: 64242.00, amount: 0.900 },
  ]
};

interface Order {
    id: string;
    pair: string;
    side: 'buy' | 'sell';
    price: number;
    amount: number;
    created_at: string;
    status: string;
}

export default function TradePage() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [price, setPrice] = useState("64246.00");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [walletBalance, setWalletBalance] = useState({ usdt: 0, btc: 0 });
  
  // شبیه‌سازی قیمت لحظه‌ای
  const [currentPrice, setCurrentPrice] = useState(64246.00);

  const supabase = createClient();

  // دریافت اطلاعات اولیه
  useEffect(() => {
    fetchUserData();
    
    // آپدیت قیمت لحظه‌ای دکوری
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 10;
      setCurrentPrice(prev => prev + change);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // 1. دریافت موجودی
    const { data: wallets } = await supabase.from('wallets').select('*');
    if (wallets) {
        const usdt = wallets.find(w => w.currency === 'usdt')?.balance || 0;
        const btc = wallets.find(w => w.currency === 'btc')?.balance || 0;
        setWalletBalance({ usdt, btc });
    }

    // 2. دریافت سفارشات باز
    const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });
    
    if (orders) setUserOrders(orders);
  };

  const handlePlaceOrder = async () => {
    if (!amount || !price) return;
    setLoading(true);

    try {
        const { data, error } = await supabase.rpc('place_order', {
            p_pair: 'BTC/USDT',
            p_side: orderType,
            p_price: Number(price),
            p_amount: Number(amount)
        });

        if (error) throw error;

        if (data.status === 'error') {
            alert(data.message);
        } else {
            // موفقیت
            setAmount("");
            fetchUserData(); // آپدیت موجودی و لیست سفارشات
        }

    } catch (err: any) {
        console.error(err);
        alert("خطا در ثبت سفارش");
    } finally {
        setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: string) => {
      // برای MVP فعلا فقط از لیست حذف میکنیم (در نسخه کامل باید پول برگرده)
      const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId);
      if (!error) fetchUserData();
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-4 px-2 sm:px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-full">
        
        {/* ستون اول: لیست سفارشات بازار (Order Book) */}
        <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden flex flex-col h-[85vh] hidden md:flex">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h3 className="text-slate-400 text-sm font-bold">Order Book</h3>
            <span className="text-xs text-slate-500">BTC/USDT</span>
          </div>
          
          {/* Ask (Sell) */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {ORDER_BOOK_MOCK.asks.map((order, i) => (
              <div key={i} className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/50 px-2 py-1 rounded relative overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 bg-rose-500/10" style={{ width: `${Math.random() * 50}%` }} />
                <span className="text-rose-500 font-mono z-10">{order.price.toLocaleString()}</span>
                <span className="text-slate-400 z-10">{order.amount}</span>
              </div>
            ))}
          </div>

          <div className="py-3 border-y border-slate-800 text-center bg-slate-900">
            <div className="text-xl font-mono font-bold text-emerald-400 flex items-center justify-center gap-2">
              {currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              <ArrowUp className="w-4 h-4" />
            </div>
            <span className="text-xs text-slate-500">≈ $64,246.00</span>
          </div>

          {/* Bid (Buy) */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {ORDER_BOOK_MOCK.bids.map((order, i) => (
              <div key={i} className="flex justify-between text-xs cursor-pointer hover:bg-slate-800/50 px-2 py-1 rounded relative overflow-hidden">
                <div className="absolute top-0 right-0 bottom-0 bg-emerald-500/10" style={{ width: `${Math.random() * 50}%` }} />
                <span className="text-emerald-500 font-mono z-10">{order.price.toLocaleString()}</span>
                <span className="text-slate-400 z-10">{order.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ستون دوم: نمودار و تاریخچه سفارشات کاربر */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          
          {/* هدر */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
             <div className="flex items-center gap-3">
                    <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" className="w-8 h-8" alt="BTC" />
                    <div>
                        <h1 className="text-white font-bold text-lg">BTC / USDT</h1>
                    </div>
             </div>
             <div className="flex gap-4 text-sm">
                <div className="text-emerald-400 font-mono">+2.45%</div>
                <div className="text-slate-400 font-mono hidden sm:block">Vol: 452 BTC</div>
             </div>
          </div>

          {/* نمودار */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-1 h-[50vh] relative">
             <TradingChart coinId="bitcoin" />
          </div>

          {/* سفارشات من (واقعی) */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 flex-1 min-h-[200px] overflow-y-auto">
             <div className="flex gap-4 border-b border-slate-800 pb-2 mb-4">
                <button className="text-emerald-400 text-sm font-bold border-b-2 border-emerald-400 pb-2 -mb-2.5">سفارشات باز من</button>
             </div>
             
             {userOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-20 text-slate-500 text-sm gap-2 opacity-50">
                    <History className="w-6 h-6" />
                    هیچ سفارش بازی ندارید
                </div>
             ) : (
                <table className="w-full text-xs sm:text-sm text-right">
                    <thead className="text-slate-500 border-b border-slate-800">
                        <tr>
                            <th className="pb-2">سمت</th>
                            <th className="pb-2">قیمت</th>
                            <th className="pb-2">مقدار</th>
                            <th className="pb-2 text-left">عملیات</th>
                        </tr>
                    </thead>
                    <tbody className="text-slate-300">
                        {userOrders.map(order => (
                            <tr key={order.id} className="border-b border-slate-800/50">
                                <td className={`py-3 font-bold ${order.side === 'buy' ? 'text-emerald-400' : 'text-rose-500'}`}>
                                    {order.side === 'buy' ? 'خرید' : 'فروش'}
                                </td>
                                <td className="py-3 font-mono">{order.price.toLocaleString()}</td>
                                <td className="py-3 font-mono">{order.amount}</td>
                                <td className="py-3 text-left">
                                    <button onClick={() => handleCancelOrder(order.id)} className="text-slate-500 hover:text-rose-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             )}
          </div>
        </div>

        {/* ستون سوم: فرم معامله (Trade Form) */}
        <div className="lg:col-span-3 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col h-fit sticky top-24">
            
            {/* تب خرید و فروش */}
            <div className="flex bg-slate-950 p-1 rounded-xl mb-6">
                <button 
                    onClick={() => setOrderType("buy")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${orderType === "buy" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                >
                    خرید
                </button>
                <button 
                    onClick={() => setOrderType("sell")}
                    className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${orderType === "sell" ? "bg-rose-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                >
                    فروش
                </button>
            </div>

            <div className="space-y-6">
                
                {/* ورودی قیمت */}
                <div className="space-y-2">
                    <label className="text-xs text-slate-500">قیمت (USDT)</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-4 text-white text-left font-mono focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-4 top-4 text-xs text-slate-500">USDT</span>
                    </div>
                </div>

                {/* ورودی مقدار */}
                <div className="space-y-2">
                    <label className="text-xs text-slate-500">مقدار (BTC)</label>
                    <div className="relative">
                        <input 
                            type="number" 
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0.00"
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-4 px-4 text-white text-left font-mono focus:border-emerald-500 focus:outline-none"
                        />
                        <span className="absolute right-4 top-4 text-xs text-slate-500">BTC</span>
                    </div>
                </div>

                {/* موجودی قابل استفاده */}
                <div className="flex justify-between text-xs text-slate-400 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1"><Wallet className="w-3 h-3" /> موجودی دسترس:</span>
                    <span className="text-white font-mono">
                        {orderType === 'buy' ? walletBalance.usdt.toLocaleString() : walletBalance.btc} 
                        <span className="ml-1 text-[10px]">{orderType === 'buy' ? 'USDT' : 'BTC'}</span>
                    </span>
                </div>

                {/* دکمه نهایی */}
                <button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${orderType === "buy" ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20" : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-500/20"}`}
                >
                    {loading ? <Loader2 className="animate-spin w-6 h-6" /> : (orderType === "buy" ? "خرید BTC" : "فروش BTC")}
                </button>

            </div>
        </div>

      </div>
    </div>
  );
}