"use server";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import {
  getAllTasksCreatedByUserOrParticipated,
  getAllTasksCreatedParticipated,
  getAllTasksDeadLineByToday,
} from "@/lib/tasks";
import { getUserAuthFromJWT } from "@/utils/helper";
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getAllTasksAction = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  if (communityId === "") return [];
  const res = await getAllTasksCreatedByUserOrParticipated(
    new ObjectId(userId),
    new ObjectId(communityId)
  );
  return res;
};

export const getAllTasksCreatedParticipatedAction = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  if (communityId === "") return [];
  const res = await getAllTasksCreatedParticipated(
    new ObjectId(userId),
    new ObjectId(communityId)
  );
  return res;
};
export const getAllTasksDeadLineByTodayAction = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  if (communityId === "") return [];
  const res = await getAllTasksDeadLineByToday(
    new ObjectId(userId),
    new ObjectId(communityId)
  );
  return res;
};

export const handleLogout = () => {
  cookies().set("jwt", "", { expires: new Date(0) });
  redirect("/auth");
};
