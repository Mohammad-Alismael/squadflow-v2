"use server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { generateAccessTokenFlat } from "@/lib/users";
import { verifyJWTToken } from "@/lib/helper/route.helper";

export const handleJoinCommunityForm = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/communities/join?code=${formData.get(
      "communityCode"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (response.status === 200) {
    const token = cookies().get("jwt");
    if (!token) redirect("/auth");
    const { payload } = await verifyJWTToken(token.value);
    const data = await response.json();
    const newAuthToken = {
      _id: payload?._id,
      username: payload?.username,
      email: payload?.email,
      communityId: data["communityId"],
      photoURL: payload?.photoURL,
    };
    cookies().set({
      name: "jwt",
      value: generateAccessTokenFlat(newAuthToken),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    revalidatePath("/settings");
  }

  await handleError(response);
};

export const handleJoinCommunity = async (code: string) => {
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/communities/join?code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (response.status === 200) revalidatePath("/settings");

  await handleError(response);
};

export const handleLeaveCommunityForm = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/communities/leave?code=${formData.get(
      "communityCode"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (response.status === 200) revalidatePath("/settings");

  await handleError(response);
};

async function handleError(response: Response) {
  if (!response.ok) {
    const msg = await response.json();
    console.log(msg["message"]);
    throw new Error(msg["message"]);
  }
}

export const handleLeaveCommunity = async (code: string) => {
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/communities/leave?code=${code}&returnId=true`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (response.status === 200) {
    const token = cookies().get("jwt");
    if (!token) redirect("/auth");
    const { payload } = await verifyJWTToken(token.value);
    const newAuthToken = {
      _id: payload?._id,
      username: payload?.username,
      email: payload?.email,
      communityId: "",
      photoURL: payload?.photoURL,
    };
    cookies().set({
      name: "jwt",
      value: generateAccessTokenFlat(newAuthToken),
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
    revalidatePath("/settings");
  }

  await handleError(response);
};

export const handleCreateCommunity = async (form: { name: string }) => {
  const response = await fetch(`${process.env.URL_API_ROUTE}/api/communities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
    body: JSON.stringify(form),
  });

  const data = await response.json();
  revalidatePath("/settings");
  return data;
};
