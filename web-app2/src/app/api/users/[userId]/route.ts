import { NextResponse } from "next/server";
import User from "@/models/user";
import { ObjectId } from "mongodb";
import CustomError from "@/utils/CustomError";
import { findUserById } from "@/lib/users";

export async function GET(request: Request, context: any) {
  const { params } = await context;
  const userId = params.userId;
  try {
    const userData = await findUserById(userId);
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      { status: error.stateCode }
    );
  }
}
