"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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
  if (!response.ok) {
    const msg = await response.json();
    console.log(msg["message"]);
    throw new Error(msg["message"]);
  }
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
};
export const handleLeaveCommunity = async (code: string) => {
  const response = await fetch(
    `${process.env.URL_API_ROUTE}/api/communities/leave?code=${code}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookies().toString(),
      },
    }
  );
  if (response.status === 200) redirect("/logout");

  if (!response.ok) {
    const msg = await response.json();
    console.log(msg["message"]);
    throw new Error(msg["message"]);
  }
};
