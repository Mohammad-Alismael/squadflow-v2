import { connectMongoDB } from "@/lib/mongodb";
import Community from "@/models/community";
import {
  CommunityResponse,
  ICommunity,
  Participant,
} from "@/utils/@types/community";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import {
  getTheOldestMember,
  isUserIdInParticipantsList,
  removeUserId,
  generateRandomId,
  isAdminUserId,
  isNoOneInParticipants,
} from "@/lib/helper/community.helper";
import CustomError from "@/utils/CustomError";
import { HttpStatusCode } from "@/utils/HttpStatusCode";
import { deleteWorkspacesByCommunityId } from "@/lib/workspace";
import { updateUserCommunityId, updateUserToken } from "@/lib/users";

export async function init() {
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
      throw new CustomError("Code doesn't exist", HttpStatusCode.NOT_FOUND);
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
  const community = await Community.findOne({ code });
  if (!community) {
    throw new CustomError(
      "community code doesn't exist",
      HttpStatusCode.NOT_FOUND
    );
  }
  const alreadyJoined = isUserIdInParticipantsList(
    community.participants,
    userId
  );

  if (alreadyJoined) {
    throw new CustomError(
      "Already joined this community",
      HttpStatusCode.CONFLICT
    );
  }

  // Ensure userId is a valid ObjectId
  const isValidObjectId = mongoose.Types.ObjectId.isValid(userId.trim());
  if (!isValidObjectId) {
    throw new CustomError("Invalid user ID", HttpStatusCode.NOT_FOUND);
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
}

async function leaveCommunityForParticipants(
  communityId: ObjectId,
  userId: string,
  participants: Participant[]
) {
  const alreadyJoined = isUserIdInParticipantsList(participants, userId);
  if (!alreadyJoined)
    throw new CustomError("already left this community", HttpStatusCode.OK);
  const newParticipants = removeUserId(participants, userId);
  await init();
  try {
    await Community.updateOne(
      { _id: communityId },
      { participants: newParticipants }
    );
  } catch (error) {
    console.error("Error creating Community:", error);
    throw new CustomError(
      "Error updating Community participants",
      HttpStatusCode.INTERNAL_SERVER_ERROR
    );
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

async function getCommunityById(
  communityId: string
): Promise<CommunityResponse> {
  await init();
  const result = await Community.findById(new ObjectId(communityId))
    .select("_id name code participants admin")
    .populate({
      path: "participants.user",
      select: "_id username email joined_community_at",
    })
    .populate({
      path: "admin",
      select: "_id username email",
    })
    .exec();

  if (!result) {
    throw new CustomError(
      "communities Id doesn't exists",
      HttpStatusCode.NOT_FOUND
    );
  }
  return result as CommunityResponse;
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

const handleCommunityExit = async (userId: string, code: string) => {
  await init();
  const foundCommunity = await findCommunityByCode(code as string);
  const { _id, participants } = foundCommunity;

  const isAdminUserId_ = isAdminUserId(foundCommunity.admin, userId as string);
  if (isAdminUserId_ && isNoOneInParticipants(participants)) {
    await deleteCommunityByCode(code as string);
    await deleteWorkspacesByCommunityId(_id);
    const user = await updateUserCommunityId(userId as string, ""); // reseting community id to empty string
    await updateUserToken(user);
    return {
      message: "deleted your community, because no one joined your community",
    };
  }
  if (isAdminUserId_) await replaceAdminByTheOldestMember(_id, participants);
  else await leaveCommunityForParticipants(_id, userId as string, participants);

  const user = await updateUserCommunityId(userId as string, ""); // reseting community id to empty string
  await updateUserToken(user);
  return { message: "success" };
};
const handleCommunityJoin = async (userId: string, code: string) => {
  await init();
  const communityId = await joinCommunityByCode(
    userId as string,
    code as string
  );
  const user = await updateUserCommunityId(userId as string, communityId);
  return user;
};
const handleCommunityCreation = async (userId: string, name: string) => {
  await init();
  const communityFound = await findCommunityByAdmin(userId as string);
  if (!communityFound) {
    const community = await createCommunity(userId as string, name as string);
    const user = await updateUserCommunityId(userId as string, community._id);
    await updateUserToken(user);
    return community._id;
  }
  throw new CustomError(
    "admin already have a community",
    HttpStatusCode.INTERNAL_SERVER_ERROR
  );
};
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
  handleCommunityExit,
  handleCommunityJoin,
  handleCommunityCreation,
};
