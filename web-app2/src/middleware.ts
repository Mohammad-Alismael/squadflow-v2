import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { redirect } from "next/navigation";
import { handleJwtValidation } from "@/utils/helperServer";

export async function middleware(request: NextRequest) {
  console.log("middleware running on", request.url);
  if (request.nextUrl.pathname.startsWith("/auth")) {
    const res = await handleJwtValidation();
    if (res) return NextResponse.redirect(new URL("/dashboard", request.url));
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith(".")) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/api/auth/")) {
    return NextResponse.next();
  }
  if (request.nextUrl.pathname.startsWith("/logout")) {
    return NextResponse.next();
  }
  const isFromApi = request.nextUrl.pathname.startsWith("/api");
  console.log("from api", isFromApi);
  try {
    const token = cookies().get("jwt");
    if (!token && isFromApi) {
      throw new Error("JWT token not found");
    }

    if (!token) {
      return NextResponse.redirect(new URL("/auth", request.url));
    }

    const { payload } = await verifyJWTToken(token.value);
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    if (payload?._id && payload?.communityId !== null) {
      requestHeaders.set("uid", payload?._id.toString());
      requestHeaders.set("cid", payload?.communityId as string);
    } else
      return NextResponse.json(
        { message: "error happened in user token" },
        { status: 500 }
      );

    // You can also set request headers in NextResponse.rewrite
    return NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });
  } catch (error) {
    console.error("Error verifying JWT token from middleware:", error.message);
    if (isFromApi)
      return NextResponse.json({ message: error.message }, { status: 400 });
    else return NextResponse.redirect(new URL("/auth", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
