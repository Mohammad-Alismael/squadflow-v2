import { connectMongoDB } from "@/lib/mongodb";
import Community from "@/models/community";
import { ObjectId } from "mongodb";
import { CommunitySchema } from "@/utils/@types/CommunitySchema";

function generateRandomId(length: number): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let randomId = "";

  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return randomId;
}
async function init() {
  await connectMongoDB();
}

async function createCommunity(userId: string) {
  await init();
  try {
    const result = await Community.create({
      name: "ya hala",
      admin: userId,
      participants: [userId],
    });
    console.log(`Community inserted with _id: ${result}`);
    return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function findCommunityByAdmin(userId: string) {
  await init();
  try {
    const result = await Community.findOne({ admin: userId });
    return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function findCommunityByCode(code: string) {
  await init();
  try {
    return await Community.findOne({ code });
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function joinCommunityByCode(userId: string, code: string) {
  await init();
  try {
    const result = await Community.findOne({ code });
    if (!result) throw new Error("code doesn't exist");
    if (result.participants.includes(userId))
      throw new Error("already joined this community");
    await Community.updateOne(
      { _id: result._id },
      { participants: [...result.participants, userId] }
    );
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function leaveCommunityByCode(userId: string, code: string) {
  await init();
  try {
    const result = await Community.findOne({ code });
    if (!result) throw new Error("code doesn't exist");
    if (!result.participants.includes(userId))
      throw new Error("already left this community");
    const newParticipants = result.participants.filter(
      (item) =>
        new ObjectId(item).toString() !== new ObjectId(userId).toString()
    );

    console.log("result.participants", result.participants);
    console.log("newParticipants", newParticipants);
    await Community.updateOne(
      { _id: result._id },
      { participants: newParticipants }
    );
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function getCommunityById(communityId: string) {
  await init();
  try {
    const result = (await Community.findOne({
      _id: new ObjectId(communityId),
    })
      .populate({
        path: "participants",
        select: "_id username email",
      })
      .populate({
        path: "admin",
        select: "_id username email",
      })
      .exec()) as CommunitySchema;

    if (!result) throw new Error("community Id doesn't exists");
    return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function updateCommunity(community: CommunitySchema) {
  await init();
  try {
    // const result = await Community.findOne({
    //   _id: new ObjectId(communityId),
    // }).populate(["participants", "admin"]) as CommunitySchema;
    // if (!result) throw new Error("community Id doesn't exists");
    // return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

export {
  createCommunity,
  generateRandomId,
  findCommunityByAdmin,
  findCommunityByCode,
  joinCommunityByCode,
  getCommunityById,
  leaveCommunityByCode,
};
