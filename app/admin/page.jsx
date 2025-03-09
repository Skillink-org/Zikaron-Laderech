import { connectToDB } from "@/server/connect";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import FallenTable from "../components/FallenTable";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  await connectToDB();

  return (
    <>
      <FallenTable/>
    </>
  );
}
