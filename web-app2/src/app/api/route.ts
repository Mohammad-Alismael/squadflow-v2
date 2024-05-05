// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextResponse } from "next/server";
export async function GET(request: Request) {
  return NextResponse.json({ message: "Hello World." }, { status: 200 });
}

export async function POST(request: Request) {
  const data = await request.json();
  // Do whatever you want
  return NextResponse.json({ message: "Hello World." }, { status: 200 });
}
