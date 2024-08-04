import { ICommunity, Participant } from "@/utils/@types/community";
import { ObjectId } from "mongodb";
import { Schema, Types } from "mongoose";
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

export function getTheOldestMember(participants: ICommunity["participants"]) {
  if (participants.length === 0) {
    return null; // or throw an error
  }
  const validParticipants = participants.filter(
    (participant) => participant.user !== undefined
  );
  const newList = validParticipants.sort((a, b) => {
    const dateA = new Date(a.joined_at).getTime();
    const dateB = new Date(b.joined_at).getTime();

    // Check if either date is invalid
    if (isNaN(dateA) || isNaN(dateB)) {
      // Throw an error if either date is invalid
      throw new Error("Invalid date detected in the list");
    }

    // If both dates are valid, proceed with the comparison
    return dateA - dateB;
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
  participants: ICommunity["participants"]
) {
  return participants.length === 0;
}

export function removeUserId(
  participants: Participant[],
  userId: string
): Participant[] {
  if (!userId) throw new Error("User not found");

  const userIdObj = new Types.ObjectId(userId);

  const index = participants.findIndex(
    (item) => item.user.toString() === userIdObj.toString()
  );

  if (index !== -1) {
    participants.splice(index, 1);
  }

  return participants;
}

export function isUserIdInParticipantsList(
  participants: Participant[],
  userId: string
) {
  if (!userId) throw new Error("User not found");
  if (!participants) throw new Error("participants not found");
  return participants.some(
    (participant) => participant.user.toString() === userId
  );
}
