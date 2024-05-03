import { z } from "zod";

export const getSchema = z.object({
  workspaceId: z.string().refine((val) => true, {
    message: "workspaceId should be a string",
  }),
});

export const patchSchema = z.object({
  color: z.string(),
  title: z.string(),
});

export const deleteSchema = z.object({
  workspaceId: z.string().refine((val) => typeof val === "string", {
    message: "workspaceId should be a string",
  }),
});
