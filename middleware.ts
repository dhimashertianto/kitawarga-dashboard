import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AdminConst, WargaConst } from "./constants/constants";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get("role")?.value || "warga";

  const roleBasedRoutes: Record<string, string[]> = {
    admin: ["/home", "/payment", "/login", "/accounts", "/category", "/rt", "/rw", "/data-warga", "/data-karyawan", "/revenue", "/paycheck", "/loans", "/others"],
    warga: ["/home", "/payment", "/login"],
  };

  if (
    (pathname === "/login" || pathname === "/register") &&
    request.cookies.has("userAuth")
  )
    return NextResponse.redirect(new URL("/home", request.url));

  if (
    (pathname === "/home" || pathname === "/" || pathname === "/accounts") &&
    !request.cookies.has("userAuth")
  )
    return NextResponse.redirect(new URL("/login", request.url));


  if (role === WargaConst && !roleBasedRoutes.warga.includes(pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (role === AdminConst && !roleBasedRoutes.admin.includes(pathname)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/home", "/payment", "/login", "/accounts", "/category", "/rt", "/rw", "/data-warga", "/data-karyawan", "/revenue", "/paycheck", "/loans", "/others"]
};
