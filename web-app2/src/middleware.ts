import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = cookies().get("jwt");

    if (!token) {
      throw new Error("JWT token not found");
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const { payload } = await jwtVerify(token.value, secret, {
      algorithms: ["HS256"],
    });
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    if (payload?._id && payload?.communityId) {
      requestHeaders.set("uid", payload?._id);
      requestHeaders.set("cid", payload?.communityId);
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
    console.error("Error verifying JWT token:", error);
    // Handle the error, you might want to send a response indicating authentication failure
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export const config = {
  matcher: [
    "/api/users/:path*",
    "/api/communities/:path*",
    "/api/workspaces/:path*",
    "/api/tasks/:path*",
  ],
};
