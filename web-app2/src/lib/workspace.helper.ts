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
  console.log(
    "p",
    participants.map(({ user }) => user.toString()),
    userId
  );
  return participants.map(({ user }) => user.toString()).includes(userId);
};

export const isUserIdHasRole = (
  participants: Array<{ user: Schema.Types.ObjectId | IUser; role: String }>,
  userId: Schema.Types.ObjectId,
  role: string
) => {
  if (!isUserIdIncludedInParticipants(userId, participants))
    throw new Error("user id not found in participants");

  const p = participants.findIndex(
    (participant) =>
      new ObjectId(participant.user).equals(userId) && participant.role === role
  );

  return p === -1;
};
