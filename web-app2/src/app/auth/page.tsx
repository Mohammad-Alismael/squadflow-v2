import AuthForm from "@/components/AuthForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import authOptions from "@/app/api/auth/[...nextauth]/options";
import { cookies } from "next/headers";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const cookie = cookies().get("jwt");
  if (cookie) redirect("/dashboard");

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AuthForm />
    </main>
  );
}
