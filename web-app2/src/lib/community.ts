import { connectMongoDB } from "@/lib/mongodb";
import Community from "@/models/community";
import { ICommunity } from "@/utils/@types/community";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import {
  getTheOldestMember,
  isUserIdInParticipantsList,
  removeUserId,
  generateRandomId,
} from "@/lib/helper/community.helper";

async function init() {
  await connectMongoDB();
}

async function createCommunity(userId: string, name: string) {
  await init();
  try {
    const result = await Community.create({
      name,
      admin: userId,
      code: generateRandomId(10),
      participants: [],
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
    return await Community.findOne({ admin: userId });
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function findCommunityByCode(code: string) {
  await init();
  try {
    const community = await Community.findOne({ code });

    if (!community) {
      throw new Error("Code doesn't exist");
    }
    return community;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function deleteCommunityByCode(code: string) {
  await init();
  try {
    const community = await Community.deleteOne({ code });

    if (!community) {
      throw new Error("Code doesn't exist");
    }
    return community;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function joinCommunityByCode(userId: string, code: string) {
  await init();
  try {
    const community = await Community.findOne({ code });

    if (!community) {
      throw new Error("Code doesn't exist");
    }
    const alreadyJoined = isUserIdInParticipantsList(
      community.participants,
      userId
    );

    if (alreadyJoined) {
      throw new Error("Already joined this community");
    }

    // Ensure userId is a valid ObjectId
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId.trim());
    if (!isValidObjectId) {
      throw new Error("Invalid user ID");
    }

    // Convert userId to ObjectId
    const userIdObjectId = new mongoose.Types.ObjectId(userId.trim());

    const participantObject = {
      user: userIdObjectId,
      joined_at: Date.now(),
    };

    // Update the document using findOneAndUpdate and $push
    const updatedCommunity = await Community.findOneAndUpdate(
      { _id: community._id },
      { $push: { participants: participantObject } },
      { new: true } // Return the modified document
    );

    return updatedCommunity._id;
  } catch (error) {
    console.error("Error joining community:", error);
    throw error;
  }
}

async function leaveCommunityForParticipants(
  communityId: ObjectId,
  userId: string,
  participants: ICommunity["participants"]
) {
  // if the user id ins't an admin
  await init();
  try {
    const alreadyJoined = isUserIdInParticipantsList(participants, userId);
    if (!alreadyJoined) throw new Error("already left this communities");
    const newParticipants = removeUserId(participants, userId);
    await Community.updateOne(
      { _id: communityId },
      { participants: newParticipants }
    );
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function replaceAdminByTheOldestMember(
  communityId: ObjectId,
  participants: ICommunity["participants"]
) {
  // if the user id is an admin
  await init();
  try {
    const oldestMemberUserId = getTheOldestMember(participants);
    await Community.updateOne(
      { _id: communityId },
      { admin: oldestMemberUserId }
    );
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function updateCommunityAdmin(
  userId: string,
  selectedNewAdminUserId: string
) {
  await init();
  try {
    const communityFound = await findCommunityByAdmin(userId);
    if (!communityFound) {
      throw new Error("Community ID doesn't exist");
    }
    communityFound.admin = selectedNewAdminUserId;
    await communityFound.save();
    return communityFound;
  } catch (error) {
    console.error("Error updating community admin:", error);
    throw error;
  }
}

async function getCommunityById(communityId: string) {
  await init();
  try {
    const result = (await Community.findById(new ObjectId(communityId))
      .select("_id name code participants admin")
      .populate({
        path: "participants.user",
        select: "_id username email joined_community_at",
      })
      .populate({
        path: "admin",
        select: "_id username email",
      })
      .exec()) as ICommunity;

    if (!result) throw new Error("communities Id doesn't exists");
    return result;
  } catch (error) {
    console.error("Error creating Community:", error);
    throw error;
  }
}

async function updateCommunity(community: ICommunity) {
  await init();
  try {
    // const result = await Community.findOne({
    //   _id: new ObjectId(communityId),
    // }).populate(["participants", "admin"]) as CommunitySchema;
    // if (!result) throw new Error("communities Id doesn't exists");
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
  leaveCommunityForParticipants,
  updateCommunityAdmin,
  replaceAdminByTheOldestMember,
  deleteCommunityByCode,
};
