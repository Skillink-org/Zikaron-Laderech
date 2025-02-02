import { NextResponse } from "next/server";
import { getFallenById } from "@/server/service/fallen.service";

export async function GET(request, { params }) {
  const { id } = await params;
  const fallen = await getFallenById(id);

  if (!fallen) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(fallen);
}
