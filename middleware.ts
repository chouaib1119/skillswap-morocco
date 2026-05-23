import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Redirect unauthenticated users away from protected routes
    if (!token && isProtectedRoute(pathname)) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Allow public routes
        if (!isProtectedRoute(pathname)) return true;
        return !!token;
      },
    },
  }
);

function isProtectedRoute(pathname: string): boolean {
  const protectedPaths = ["/dashboard", "/settings", "/chat", "/admin", "/onboarding"];
  return protectedPaths.some((path) => pathname.startsWith(path));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login|register).*)"],
};
