import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* تنظیمات نادیده گرفتن خطاها برای بیلد */
  eslint: {
    // هشدار: این گزینه باعث میشه خطاهای ESLint مانع بیلد نشن
    ignoreDuringBuilds: true,
  },
  typescript: {
    // هشدار: این گزینه باعث میشه خطاهای تایپ‌اسکریپت مانع بیلد نشن
    ignoreBuildErrors: true,
  },
  images: {
    // برای جلوگیری از گیر دادن به عکس‌های اکسترنال
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;