import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./lib/routes";
import { STORAGE_KEYS } from "./lib/constant/storage";
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = Object.values(publicRoutes).some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (isPublicRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(STORAGE_KEYS.AUTH_TOKEN)?.value;
  if (!token) {
    return NextResponse.redirect(new URL(publicRoutes.login, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api(?:/|$)|_next(?:/|$)|favicon\\.ico$|sitemap\\.xml$|robots\\.txt$).*)"],
};
