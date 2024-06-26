"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const deleteJWTToken = async () => {
  const res = await fetch("http://localhost:3000/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: { Cookie: cookies().toString() },
    cache: "no-cache",
  });
  // if (res.ok) {
  //   redirect("/auth");
  // }
  return res.json();
};
async function deleteCookie() {
  cookies().delete("jwt");
}
export default async function Page() {
  await deleteJWTToken();
  return (
    <div>
      <p>delete</p>
    </div>
  );
}
