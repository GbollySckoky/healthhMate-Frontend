import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { publicRoutes } from "./lib/constant/Routes";


export default function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  // console.log("Token from proxy:", token);
  // Run BEFORE /profile is returned
  if (!token) {
    return NextResponse.redirect(new URL(publicRoutes.login, request.url));
  }

  // Continue to the requested page
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|auth(?:/|$)).*)"],
};
