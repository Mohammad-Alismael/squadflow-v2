"use server";
import { getUserAuthFromJWT } from "@/utils/helper";
import { getCommunityById } from "@/lib/community";
import { isAdminUserId } from "@/lib/helper/community.helper";
import { CommunityResponse } from "@/utils/@types/community";

export const handleFetchCommunity = async () => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();

  try {
    const communityFound = await getCommunityById(communityId as string);
    const isAdmin = isAdminUserId(communityFound.admin._id, userId as string);
    const participantsWithoutUserId = communityFound.participants.filter(
      (participant) => participant.user._id.toString() !== userId
    );
    return JSON.parse(
      JSON.stringify({
        ...communityFound,
        participants: participantsWithoutUserId,
        isAdmin,
      })
    ) as CommunityResponse;
  } catch (error) {
    throw error;
  }
};
