import { faker, SimpleFaker } from "@faker-js/faker";
import { ObjectId } from "mongodb";

export const generateFakeTask = (
  workspaceId: ObjectId,
  columnIds: ObjectId[],
  labels: { _id: ObjectId; color: string; title: string }[],
  participants: ObjectId[]
) => {
  const numberParticipants = faker.number.int({
    min: 1,
    max: participants.length,
  });
  const randomNumberOfColumns = faker.number.int({
    min: 0,
    max: columnIds.length - 1,
  });
  const labelsCount = faker.number.int({ min: 1, max: labels.length });
  const commentsCount = faker.number.int({ min: 0, max: 5 });
  const creatorId = participants[numberParticipants - 1];
  const customSimpleFaker = new SimpleFaker();

  return {
    workspace: workspaceId,
    title: faker.company.catchPhrase(),
    columnId: columnIds[randomNumberOfColumns],
    participants: Array.from({ length: numberParticipants }).map(
      (_, index) => participants[index]
    ),
    labels: Array.from({ length: labelsCount }).map(
      (_, index) => labels[index]
    ),
    comments: Array.from({ length: commentsCount }).map(() => ({
      created_by: creatorId,
      text: faker.lorem.sentence(),
      created_at: faker.date.recent(),
    })),
    dueDate: faker.date.recent().toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    }),
    dueTime: faker.date
      .future()
      .toISOString()
      .split("T")[1]
      .split(".")[0]
      .slice(0, 5),
    priority: customSimpleFaker.helpers.arrayElement(["Low", "Medium", "High"]),
    description: faker.lorem.paragraph(),
    attachments: [],
    created_by: creatorId,
    updated_by: creatorId,
  };
};
