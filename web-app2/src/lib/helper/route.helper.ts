import { NextResponse } from "next/server";

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
