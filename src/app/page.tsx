import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import IcpForm from "./Components/IcpForm";
import IcpPost from "./Components/IcpPost";
import { Nav } from "./Components/Nav";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <>
      <Nav />
      <IcpForm />
      <IcpPost />
    </>
  );
}