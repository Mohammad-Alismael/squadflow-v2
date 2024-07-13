import { z } from "zod";
export type FormFields = {
  title: string;
  participants: { user: string; role: "admin" | "editor" | "viewer" }[];
};
export const formSchema = z.object({
  title: z.string().min(4).max(50),
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
