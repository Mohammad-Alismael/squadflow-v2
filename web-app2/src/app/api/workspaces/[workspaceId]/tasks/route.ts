// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { z } from "zod";
import { validateSchema, validateCommunity } from "@/lib/helper/route.helper";
const putSchema = z.object({
  workspaceId: z.string().refine((val) => true, {
    message: "workspaceId should be a string",
  }),
});
export async function GET(request: Request, context: any) {
  const { params } = await context;
  const { workspaceId } = params;
  validateSchema(putSchema, { workspaceId });
  const userId = request.headers.get("uid");
  const communityId = request.headers.get("cid");
  validateCommunity(communityId as string);
}
