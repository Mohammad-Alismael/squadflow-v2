"use server";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { cookies } from "next/headers";
import { getRedisClient } from "@/lib/redis-setup";
import { IWorkspace } from "@/utils/@types/workspace";

export const handleJwtValidation = async () => {
  const cookie = cookies().get("jwt");
  if (!cookie || !cookie.value) return false;
  try {
    // Verify the JWT token
    cookie && (await verifyJWTToken(cookie.value));
    return true;
  } catch (error) {
    // console.error("Error verifying JWT token auth page:", error);
    return false;
  }
};
