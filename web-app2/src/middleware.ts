import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { verifyJWTToken } from "@/lib/helper/route.helper";

export async function middleware(request: NextRequest) {
  try {
    const token = cookies().get("jwt");
    // i can't get cookies while hitting api from nextjs frontend
    if (!token) {
      throw new Error("JWT token not found");
    }

    const { payload } = await verifyJWTToken(token.value);
    // Clone the request headers and set a new header `x-hello-from-middleware1`
    const requestHeaders = new Headers(request.headers);
    if (payload?._id && payload?.communityId) {
      requestHeaders.set("uid", <string>payload?._id);
      requestHeaders.set("cid", <string>payload?.communityId);
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
// export const config = {
//   matcher: [
//     "/api/users/:path*",
//     "/api/communities/:path*",
//     "/api/workspaces/:path*",
//     "/api/tasks/:path*",
//   ],
// };
