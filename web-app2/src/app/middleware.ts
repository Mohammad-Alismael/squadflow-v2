// import { NextRequest, NextResponse } from "next/server";
//
// const isAdminRoute = (pathname: string) => {
//   return pathname.startsWith("/api/admin");
// };
//
// const isUserRoute = (pathname: string) => {
//   return pathname.startsWith("/api/users");
// };
//
// export async function middleware(request: NextRequest) {
//   // Call our authentication function to check the request
//   if (!isAuthenticated(request)) {
//     // Respond with JSON indicating an error message
//     return Response.json(
//       { success: false, message: "authentication failed" },
//       { status: 401 }
//     );
//   }
//   return NextResponse.next();
// }
//
// export const config = {
//   matcher: ["/api/users/:path*"],
// };
