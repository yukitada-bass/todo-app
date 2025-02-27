import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuthenticated = !!req.auth; // 認証されているかどうか

  // 未認証ユーザーが /login 以外のページにアクセスしようとしたら /login にリダイレクト
  if (!isAuthenticated && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // 認証済みユーザーが /login にアクセスしようとしたら / にリダイレクト
  if (isAuthenticated && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next(); // それ以外は通常どおり進む
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
