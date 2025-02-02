import { NextResponse } from "next/server";
import {
  getAllFallen,
  getFilteredFallen,
} from "@/server/service/fallen.service";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  const fallen = query ? await getFilteredFallen(query) : await getAllFallen();

  return NextResponse.json(fallen);
}
