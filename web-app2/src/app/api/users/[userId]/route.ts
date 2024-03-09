import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const userId = params.userId;
  // Do whatever you want
  return NextResponse.json({ message: "Hello World map" }, { status: 200 });
}
