import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJWTToken } from "@/lib/helper/route.helper";

export async function handleError(response: Response) {
  if (!response.ok) {
    const msg = await response.json();
    console.log(msg["message"]);
    throw new Error(msg["message"]);
  }
}

export const getUserAuthFromJWT = async () => {
  const token = cookies().get("jwt");
  if (!token) redirect("/auth");
  const { payload } = await verifyJWTToken(token.value);
  return payload as {
    _id: string;
    email: string;
    username: string;
    photoURL: string;
    communityId: string;
  };
};
