import { faker } from "@faker-js/faker";
import mongoose from "mongoose";

export function createRandomUser() {
  return {
    _id: new mongoose.Types.ObjectId(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    photoURL: faker.image.avatar(),
    communityId: "",
    community: null,
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 17,
});
