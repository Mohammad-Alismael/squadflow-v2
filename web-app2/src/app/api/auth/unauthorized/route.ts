import { NextResponse } from "next/server";

type ResponseBody = { message: string };

export async function GET(request: Request) {
  return NextResponse.json({ message: "Not authenticated." }, { status: 401 });
}
