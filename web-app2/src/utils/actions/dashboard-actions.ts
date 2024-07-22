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
export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export const getAllTasksAction = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const res = await getAllTasksCreatedByUserOrParticipated(
    new ObjectId(userId)
  );
  return res;
};

export const getAllTasksCreatedParticipatedAction = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  const res = await getAllTasksCreatedParticipated(
    new ObjectId(userId),
    new ObjectId(communityId)
  );
  return res;
};
export const getAllTasksDeadLineByTodayAction = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const communityId = payload?.communityId as string;
  const res = await getAllTasksDeadLineByToday(
    new ObjectId(userId),
    new ObjectId(communityId)
  );
  return res;
};
