import { getUserAuthFromJWT } from "@/utils/helper";
import { getWorkspaceById, getWorkspaceParticipants } from "@/lib/workspace";
import { ObjectId } from "mongodb";
import { IWorkspace, WorkspaceParticipants } from "@/utils/@types/workspace";
import { PopulatedUser } from "@/utils/@types/user";
import { getRedisClient } from "@/lib/redis-setup";
const handleGetWorkspaceParticipantsCache = async (
  workspaceId: string,
  callback: () => Promise<any>
) => {
  try {
    const client = await getRedisClient();
    console.time("getWorkspaceParticipantsCache");
    const workspaceCache = await client.get(`workspace_${workspaceId}`);
    console.timeEnd("getWorkspaceParticipantsCache");

    if (workspaceCache)
      return JSON.parse(workspaceCache)
        .participants as IWorkspace["participants"];
    else {
      return callback();
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const fetchWorkspaceParticipants = async (
  workspaceId: string,
  withDetails: boolean
) => {
  const { _id: userId, communityId } = await getUserAuthFromJWT();
  try {
    if (withDetails) {
      const callback = async () => {
        const result = await getWorkspaceParticipants(
          new ObjectId(workspaceId)
        );
        return result.participants;
      };
      let participantsList: WorkspaceParticipants[] =
        await handleGetWorkspaceParticipantsCache(workspaceId, callback);
      // let participantsList: WorkspaceParticipants[] = await callback();
      const listWithoutUserId = participantsList.filter(
        (item: { _id: string; user: PopulatedUser; role: string }) => {
          return item.user._id !== userId;
        }
      );
      return listWithoutUserId as WorkspaceParticipants[];
    } else {
      const callback = async () => {
        const result = await getWorkspaceById(new ObjectId(workspaceId));
        return result.participants;
      };

      let participantsList: WorkspaceParticipants[] =
        await handleGetWorkspaceParticipantsCache(workspaceId, callback);
      // let participantsList: WorkspaceParticipants[] = await callback();

      const listWithoutUserId = participantsList.filter(
        (item: WorkspaceParticipants) => {
          return item.user._id !== userId;
        }
      );

      return listWithoutUserId as WorkspaceParticipants[];
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};
