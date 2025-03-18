import { connectToDB } from "@/server/connect";
import { getFallenById } from "@/server/service/fallen.service";
import StatusMessage from "@/app/components/StatusMessage";
import FallenPageClient from "./components/fallenPage.client";

export default async function FallenPage({ params }) {
  await connectToDB();
  // TODO - bonus - use name of fallen instead of id
  const fallenId = (await params).fallen;
  const fallen = await getFallenById(fallenId);
  
  if (!fallen)
    return <StatusMessage message='הנופל לא נמצא' type="error" />;

  return <FallenPageClient fallen={fallen} />
}

