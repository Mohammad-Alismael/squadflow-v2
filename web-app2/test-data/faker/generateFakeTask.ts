import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
const generateFakeTask = () => {
  const participantsCount = faker.datatype.number({ min: 1, max: 5 });
  const labelsCount = faker.datatype.number({ min: 1, max: 3 });
  const commentsCount = faker.datatype.number({ min: 0, max: 5 });
  const attachmentsCount = faker.datatype.number({ min: 0, max: 3 });

  return {
    workspace: mongoose.Types.ObjectId(), // Assuming it's a reference to a Workspace
    title: faker.company.catchPhrase(),
    columnId: faker.random.alphaNumeric(10),
    participants: Array.from({ length: participantsCount }).map(() =>
      mongoose.Types.ObjectId()
    ),
    labels: Array.from({ length: labelsCount }).map(() => ({
      color: faker.commerce.color(),
      title: faker.commerce.productName(),
    })),
    comments: Array.from({ length: commentsCount }).map(() => ({
      created_by: mongoose.Types.ObjectId(),
      text: faker.lorem.sentence(),
      created_at: faker.date.recent(),
    })),
    dueDate: faker.date.future().toISOString().split("T")[0],
    dueTime: faker.date.future().toISOString().split("T")[1].split(".")[0],
    priority: faker.random.arrayElement(["Low", "Medium", "High"]),
    description: faker.lorem.paragraph(),
    attachments: Array.from({ length: attachmentsCount }).map(() =>
      faker.internet.url()
    ),
    created_by: mongoose.Types.ObjectId(),
    updated_by: mongoose.Types.ObjectId(),
  };
};
