import { Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";
import { ObjectId } from "mongodb";

export const isUserWhoCreatedWorkspace = (
  userId: string,
  createdBy: string
) => {
  return createdBy === userId;
};

export const isUserIdIncludedInParticipants = (
  userId: string,
  participants: IWorkspace["participants"]
) => {
  return participants
    .map(({ user }) => user.toString())
    .includes(new ObjectId(userId).toString());
};

export const isUserIdHasRole = (
  participants: IWorkspace["participants"],
  userId: string,
  role: string
) => {
  if (participants.length === 0) return false;
  if (!isUserIdIncludedInParticipants(userId, participants))
    throw new Error("user id not found in participants");

  return participants.some(
    (participant) =>
      new ObjectId(participant.user).equals(userId) && participant.role === role
  );
};
