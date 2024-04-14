import { CommunitySchema } from "@/utils/@types/CommunitySchema";
import { ObjectId } from "mongodb";
import { Schema } from "mongoose";
import { IUser } from "@/utils/@types/user";

export function generateRandomId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomId = "";

  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return randomId;
}

export function getTheOldestMember(
  participants: CommunitySchema["participants"]
) {
  if (participants.length === 0) {
    return null; // or throw an error
  }
  const validParticipants = participants.filter(
    (participant) => participant.user !== undefined
  );
  const newList = validParticipants.sort((a, b) => {
    const dateA = new Date(a.joined_at);
    const dateB = new Date(b.joined_at);

    // Check if either date is invalid
    if (isNaN(dateA) || isNaN(dateB)) {
      // Throw an error if either date is invalid
      throw new Error("Invalid date detected in the list");
    }

    // If both dates are valid, proceed with the comparison
    return dateA.getTime() - dateB.getTime();
  });
  if (newList.length > 0) {
    return newList[0].user;
  } else {
    throw new Error("No valid participants found");
  }
}

export function isAdminUserId(admin: string, userId: string) {
  if (!ObjectId.isValid(admin) || !ObjectId.isValid(userId)) {
    throw new Error("Invalid ObjectId");
  }
  return new ObjectId(admin).equals(userId);
}

export function isNoOneInParticipants(
  participants: CommunitySchema["participants"]
) {
  return participants.length === 0;
}

export function removeUserId(
  participants: Array<{ user: Schema.Types.ObjectId | IUser; joined_at: Date }>,
  userId: string
) {
  return participants.filter((item) => !new ObjectId(item.user).equals(userId));
}

export function isUserIdInParticipantsList(
  participants: Array<{ user: Schema.Types.ObjectId | IUser; joined_at: Date }>,
  userId: string
) {
  return participants.some((participant) => participant.user.equals(userId));
}
