import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  // 1. آماده‌سازی پاسخ اولیه
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. ساخت کلاینت سوپابیس برای دسترسی به کوکی‌ها
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // 3. چک کردن وضعیت کاربر (این دستور سشن رو هم رفرش می‌کنه)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. لیست صفحات محافظت شده
  // اگر کاربر لاگین نکرده بود و خواست بره اینجاها، بفرستش صفحه لاگین
  if (!user) {
    if (
      request.nextUrl.pathname.startsWith("/dashboard") ||
      request.nextUrl.pathname.startsWith("/trade") ||
      request.nextUrl.pathname.startsWith("/deposit") ||
      request.nextUrl.pathname.startsWith("/withdraw")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 5. برعکس: اگر کاربر لاگین کرده بود و رفت صفحه لاگین/ثبت‌نام، بفرستش داشبورد
  if (user) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * تمام مسیرها رو چک کن به جز فایل‌های استاتیک و عکس‌ها
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};