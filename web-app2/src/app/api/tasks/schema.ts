import { z } from "zod";

export const getOrDeleteSchema = z.object({
  taskId: z
    .string()
    .regex(/^[0-9a-f]{24}$/)
    .refine((val) => true, {
      message: "taskId should be a string",
    }),
});

const TaskComment = z.object({
  user: z.string(),
  text: z.string(),
  created_at: z.date(),
});

export const postCommentSchema = z.object({
  text: z.string(),
});

export const postSchema = z.object({
  workspace: z.string(),
  title: z.string(),
  columnId: z.string(),
  participants: z.array(z.string()),
  tags: z.array(z.string()),
  comments: z.array(TaskComment),
  dueDate: z.string(),
  dueTime: z.string(),
  priority: z.string(),
  description: z.string(),
  attachments: z.array(z.string()),
  created_by: z.string(),
});

export const putSchema = z.object({
  workspace: z.string(),
  title: z.string(),
  columnId: z.string(),
  participants: z.array(z.string()),
  tags: z.array(z.string()),
  comments: z.array(TaskComment),
  dueDate: z.string(),
  dueTime: z.string(),
  priority: z.string(),
  description: z.string(),
  attachments: z.array(z.string()),
  updated_by: z.string(),
});
