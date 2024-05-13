import AuthForm from "@/components/AuthForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { cookies } from "next/headers";
import { verifyJWTToken } from "@/lib/helper/route.helper";

export default async function Home() {
  const cookie = cookies().get("jwt");
  try {
    // Verify the JWT token
    await verifyJWTToken(cookie.value);
  } catch (error) {
    console.error("Error verifying JWT token auth page:", error);
  }
  if (cookie?.value && cookie?.value !== "") redirect("/dashboard");

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AuthForm />
    </main>
  );
}
