import { z } from "zod";

export const getSchema = z.object({
  workspaceId: z.string().refine((val) => true, {
    message: "workspaceId should be a string",
  }),
});

export const putSchema = z.object({
  workspaceId: z.string().refine((val) => true, {
    message: "workspaceId should be a string",
  }),
  title: z.string().refine((val) => true, {
    message: "title should be a string",
  }),
  participants: z.array(
    z
      .object({
        user: z.string(),
        role: z.enum(["admin", "editor", "viewer"]),
      })
      .refine((value) => ["admin", "editor", "viewer"].includes(value.role), {
        message: "role should be either admin or editor or viewer",
      })
  ),
  labels: z.array(z.object({ color: z.string(), title: z.string() })),
});

export const deleteSchema = z.object({
  workspaceId: z.string().refine((val) => typeof val === "string", {
    message: "workspaceId should be a string",
  }),
});
