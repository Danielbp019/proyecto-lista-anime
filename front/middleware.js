// middleware.js
import { NextResponse } from "next/server";

export async function middleware(request) {
  const token = request.cookies.get("auth_token");

  if (!token && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
