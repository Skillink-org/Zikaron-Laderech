import { connectToDB } from "@/server/connect";
import { getFallen, getFallenById } from "@/server/service/fallen.service";
import StatusMessage from "@/app/components/StatusMessage";
import FallenPageClient from "./components/fallenPage.client";

export default async function FallenPage({ params }) {
  await connectToDB();
  const slug = decodeURIComponent((await params).fallen);
  const fallen = await getFallen({'slug': slug});
  
  if (!fallen)
    return <StatusMessage message='הנופל לא נמצא' type="error" />;

  return <FallenPageClient fallen={fallen} />
}

