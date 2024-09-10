import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { generateRandomId } from "@/lib/helper/community.helper";
import { ObjectId } from "mongodb";
export const generateFakeCommunity = (
  adminId: ObjectId,
  participants: ObjectId[]
) => {
  return {
    _id: new mongoose.Types.ObjectId(),
    name: faker.company.name(),
    code: generateRandomId(10),
    admin: adminId, // Assuming it's a reference to a User
    participants: participants.map((_, index) => ({
      user: participants[index],
      joined_at: faker.date.past(),
    })),
  };
};
