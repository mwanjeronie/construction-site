import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import type { SessionData } from "@/lib/session";

const sessionOptions = {
  password:
    process.env.SESSION_SECRET ||
    "construction-site-uganda-secret-key-2024-secure",
  cookieName: "cs_admin_session",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin routes (not /admin/login)
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login")
  ) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const session = await getIronSession<SessionData>(
        request.cookies as any,
        sessionOptions
      );

      if (!session.isAdmin) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }
    } catch {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
