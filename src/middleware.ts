import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "dev-only-fallback-secret-not-for-production"
);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect admin pages and API routes (except login/logout)
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  const isAuthRoute = pathname.startsWith("/admin/login") || pathname.startsWith("/api/admin/login") || pathname.startsWith("/api/admin/logout");

  if (isAdminRoute && !isAuthRoute) {
    const token = req.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
