"use server";
import { findUserByUserId } from "@/lib/users";
import { getUserAuthFromJWT } from "@/utils/helper";

export const handelGetUserAuth = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  const user = await findUserByUserId(userId);
  return user;
};
