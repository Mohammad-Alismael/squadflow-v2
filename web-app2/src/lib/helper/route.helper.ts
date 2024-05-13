import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const validateSchema = (schema: any, data: any) => {
  const { error, success } = schema.safeParse(data);
  if (!success) {
    return NextResponse.json(error.format(), {
      status: 400,
    });
  }
};

export const validateCommunity = (communityId: string) => {
  if (!communityId || communityId === "")
    return NextResponse.json({
      message: "you must join a community first!",
    });
};

export const verifyJWTToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return { payload };
  } catch (error) {
    console.error("Error verifying JWT token from verifyJWTToken:", error);
    throw error;
  }
};

export const isJWTTokenExpired = async (token: string) => {
  if (!token) return true;
  try {
    const { payload } = await verifyJWTToken(token);
    if (!payload) return true;
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return currentTime > payload?.exp;
  } catch (error) {
    // Handle error if JWT verification fails
    console.error("Error verifying JWT token from isJWTTokenExpired:", error);
    // throw error; // Re-throw the error to be handled by the caller
    return true;
  }
};
