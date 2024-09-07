import { users } from "./createRandomUser";
import { generateFakeCommunity } from "./generateFakeCommunity";
import community from "@/models/community";
import { generateFakeWorkspace } from "./generateFakeWorkspace";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";

export const execute = () => {
  let generatedUsers = users;
  const admin1 = generatedUsers[0];
  const participants1 = generatedUsers.slice(0, 5).map((user) => user._id);
  const admin2 = generatedUsers[6];
  const participants2 = generatedUsers.slice(6, 11).map((user) => user._id);
  const admin3 = generatedUsers[12];
  const participants3 = generatedUsers.slice(12, 17).map((user) => user._id);

  const community1 = generateFakeCommunity(admin1._id, participants1);
  const community2 = generateFakeCommunity(admin2._id, participants2);
  const community3 = generateFakeCommunity(admin3._id, participants3);

  const list1 = participants1.map((user) => ({
    ...generatedUsers.find((_) => _._id === user),
    community: community1._id,
    communityId: community1._id.toString(),
  }));

  const list2 = participants2.map((user) => ({
    ...generatedUsers.find((_) => _._id === user),
    community: community2._id,
    communityId: community2._id.toString(),
  }));

  const list3 = participants3.map((user) => ({
    ...generatedUsers.find((_) => _._id === user),
    community: community3._id,
    communityId: community3._id.toString(),
  }));
  generatedUsers = list1.concat(list2).concat(list3);
  const communityList = [community1, community2, community3];
  // generateFakeWorkspace
  const workspaceList: {
    _id: Types.ObjectId;
    created_by: ObjectId;
    community: ObjectId;
    title: string;
    participants: { user: ObjectId; role: "admin" | "editor" | "viewer" }[];
    columns: { order: number; title: string; color: string }[];
    labels: { color: string; title: string }[];
    progress: number;
  }[] = [];
  communityList.forEach((community) => {
    workspaceList.push(
      generateFakeWorkspace(
        community._id,
        community.participants[0].user,
        community.participants
      )
    );
  });
  console.log({
    usersList: generatedUsers,
    generatedCommunities: [community1, community2, community3],
    workspaceList,
  });
  return {
    usersList: generatedUsers,
    communitiesList: [community1, community2, community3],
    workspaceList,
  };
};
