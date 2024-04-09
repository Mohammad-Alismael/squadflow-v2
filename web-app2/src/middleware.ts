import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = cookies().get("jwt");
    console.log(token);

    if (!token) {
      throw new Error("JWT token not found");
    }

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const { payload } = await jwtVerify(token.value, secret, {
      algorithms: ["HS256"],
    });
    console.log({ payload });
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("uid", payload?._id);
    requestHeaders.set("cid", payload?.communityId);

    // You can also set request headers in NextResponse.rewrite
    const response = NextResponse.next({
      request: {
        // New request headers
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error) {
    console.error("Error verifying JWT token:", error);
    // Handle the error, you might want to send a response indicating authentication failure
    return NextResponse.json({ message: error.name }, { status: 400 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/:path*", "/api/communities/:path*"],
};
