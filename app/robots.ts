import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://tivan-ex.vercel.app"; // 👈 آدرس نهایی سایتت رو اینجا بذار

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/admin/", "/private/"], // صفحاتی که نباید توی گوگل بیان
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}