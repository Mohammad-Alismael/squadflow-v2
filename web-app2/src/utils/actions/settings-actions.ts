import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";
import { findUserByUserId } from "@/lib/users";
import { getCommunityById } from "@/lib/community";
import { isAdminUserId } from "@/lib/helper/community.helper";

export const fetchCommunity = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  const userId = payload?._id as string;
  const { communityId } = await findUserByUserId(userId);
  if (communityId === "") {
    return new Response(null, {
      status: 204,
    });
  }
  try {
    const communityFound = await getCommunityById(communityId as string);
    const isAdmin = isAdminUserId(communityFound.admin._id, userId as string);
    const participantsWithoutUserId = communityFound[
      "_doc"
    ].participants.filter(
      (participant) => participant.user._id.toString() !== userId
    );
    console.log({
      ...communityFound["_doc"],
      participants: participantsWithoutUserId,
      isAdmin,
      status: 200,
    });
    return {
      ...communityFound["_doc"],
      participants: participantsWithoutUserId,
      isAdmin,
      status: 200,
    };
  } catch (error) {
    return {
      message: error.message,
      status: error.status,
    };
  }
};
