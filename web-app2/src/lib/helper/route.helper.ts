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
    // Handle error if JWT verification fails
    console.error("Error verifying JWT token:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const isJWTTokenExpired = async (token: string) => {
  console.log(token);
  if (!token) return false;
  try {
    const { payload } = await verifyJWTToken(token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
    return currentTime > payload.exp;
  } catch (error) {
    // Handle error if JWT verification fails
    console.error("Error verifying JWT token:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};
