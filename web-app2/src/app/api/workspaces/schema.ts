import { z } from "zod";

export const postSchema = z.object({
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
});
