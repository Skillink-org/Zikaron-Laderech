import { connectToDB } from "@/server/connect";
import { getAllFallen } from "@/server/service/fallen.service";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import FallenTable from "../components/FallenTable";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  await connectToDB();
  const { data } = await getAllFallen(0, 0, "all");

  return (
    <>
      <FallenTable fallenData={data} />
    </>
  );
}
