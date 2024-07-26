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

  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload as {
    _id: string;
    email: string;
    username: string;
    photoURL: string;
    communityId: string;
  };
};
