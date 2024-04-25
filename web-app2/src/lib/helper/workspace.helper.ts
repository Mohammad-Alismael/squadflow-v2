import { Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";
import { ObjectId } from "mongodb";

export const isUserWhoCreatedWorkspace = (
  userId: Schema.Types.ObjectId,
  createdBy: Schema.Types.ObjectId
) => {
  return createdBy.toString() === userId.toString();
};

export const isUserIdIncludedInParticipants = (
  userId: Schema.Types.ObjectId,
  participants: Array<{ user: Schema.Types.ObjectId | IUser; role: String }>
) => {
  return participants
    .map(({ user }) => user.toString())
    .includes(new ObjectId(userId).toString());
};

export const isUserIdHasRole = (
  participants: Array<{ user: Schema.Types.ObjectId | IUser; role: String }>,
  userId: Schema.Types.ObjectId,
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
