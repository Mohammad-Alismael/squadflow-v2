import { z } from "zod";

export const joinPostSchema = z.object({
  code: z.string().length(10),
});
