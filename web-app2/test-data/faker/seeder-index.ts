import { createRandomUser, users } from "./createRandomUser";
import { generateFakeCommunity } from "./generateFakeCommunity";
import { faker } from "@faker-js/faker";
import { generateFakeWorkspace } from "./generateFakeWorkspace";
import { ObjectId } from "mongodb";
import { Types } from "mongoose";
import { generateFakeTask } from "./generateFakeTask";

type TFakerUser = {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  communityId: string;
  community: null;
};
type TFakeCommunity = {
  _id: Types.ObjectId;
  name: string;
  code: string;
  admin: Types.ObjectId; // Assuming it's a reference to a User
  participants: {
    user: Types.ObjectId;
    joined_at: Date;
  }[];
};
type TFakeWorkspace = {
  _id: Types.ObjectId;
  created_by: ObjectId;
  community: ObjectId;
  title: string;
  participants: { user: ObjectId; role: "admin" | "editor" | "viewer" }[];
  columns: {
    _id: Types.ObjectId;
    order: number;
    title: string;
    color: string;
  }[];
  labels: { _id: ObjectId; color: string; title: string }[];
  progress: number;
};
type TFakeTask = {
  workspace: ObjectId;
  title: string;
  columnId: ObjectId;
  participants: ObjectId[];
  labels: { _id: ObjectId; color: string; title: string }[];
  comments: { created_by: ObjectId; text: string; created_at: Date }[];
  dueDate: string;
  dueTime: string;
  priority: "Low" | "Medium" | "High";
  description: string;
  attachments: never[];
  created_by: ObjectId;
  updated_by: ObjectId;
};

export const generateUsers = (
  numberOfLeaders: number,
  numberOfUsers: number
) => {
  const list: {
    leader: TFakerUser;
    users: TFakerUser[];
  }[] = [];
  Array.from({ length: numberOfLeaders }).map((item, index) => {
    const users = faker.helpers.multiple(createRandomUser, {
      count: numberOfUsers,
    });
    const randomLeaderIndex = faker.number.int({
      min: 0,
      max: numberOfUsers - 1,
    });
    const object = {
      leader: users[randomLeaderIndex],
      users,
    };
    list.push(object);
  });
  return list;
};

export const flatUsers = (
  data: {
    leader: TFakerUser;
    users: TFakerUser[];
  }[]
) => {
  const list: TFakerUser[] = [];
  data.map((item, index) => {
    item.users.forEach((user) => {
      list.push(user);
    });
  });
  return list;
};

export const generateCommunities = (
  data: {
    leader: TFakerUser;
    users: TFakerUser[];
  }[]
) => {
  return data.map(({ leader, users }, index) => {
    const userIds = users.map((_) => _._id);
    return generateFakeCommunity(leader._id, userIds);
  });
};

export const updateUserCommunity = (
  data: {
    leader: TFakerUser;
    users: TFakerUser[];
  }[],
  communitites: any[]
) => {
  return data.map(({ leader, users }, index) => {
    const generatedCommunity = communitites[index];
    const updatedUsers = users.map((user) => ({
      ...user,
      community: generatedCommunity._id,
      communityId: generatedCommunity._id.toString(),
    }));
    return { leader, users: updatedUsers };
  });
};

export const generateWorkspaces = (
  data: TFakeCommunity[],
  numberOFWorkspaces: number
) => {
  const list: TFakeWorkspace[] = [];
  data.map((community) => {
    return Array.from({ length: numberOFWorkspaces }).map((item, index) => {
      const a = generateFakeWorkspace(
        community._id,
        community.participants[0].user,
        community.participants
      );
      list.push(a);
    });
  });
  return list;
};

export const generateTasks = (
  workspaces: TFakeWorkspace[],
  numberOfTasks: number
) => {
  const list: TFakeTask[] = [];
  workspaces.forEach((workspace) => {
    return Array.from({ length: numberOfTasks }).forEach((item, index) => {
      const columnIds = workspace.columns.map((column) => column._id);
      const participants = workspace.participants.map((item) => item.user);
      const object = generateFakeTask(
        workspace._id,
        columnIds,
        workspace.labels,
        participants
      );
      list.push(object);
    });
  });
  return list;
};
export const smartGenerateData = () => {
  const users1 = generateUsers(5, 20);
  const communities = generateCommunities(users1);
  const users = updateUserCommunity(users1, communities);
  const workspaces = generateWorkspaces(communities, 6);
  const tasks = generateTasks(workspaces, 20);

  return {
    users,
    communities,
    workspaces,
    tasks,
  };
};

export const execute = () => {
  const users1 = generateUsers(3, 5);
  const communities = generateCommunities(users1);
  const users = updateUserCommunity(users1, communities);
  const workspaces = generateWorkspaces(communities, 3);
  return {
    usersList: flatUsers(users),
    communitiesList: communities,
    workspaceList: workspaces,
  };
};
