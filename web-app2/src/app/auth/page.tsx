import AuthForm from "@/components/AuthForm";
import { redirect } from "next/navigation";
import { handleJwtValidation } from "@/app/auth/actions";

export default async function Home() {
  const res = await handleJwtValidation();
  if (res) redirect("/dashboard");

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <AuthForm />
    </main>
  );
}
