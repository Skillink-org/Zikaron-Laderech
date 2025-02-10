"use server";

import { auth } from "@/auth";
import * as service from "@/server/service/fallen.service.js";

export async function getFallenById(id) {
  const response = await service.getFallenById(id);

  if (!response) {
    return {
      ok: false,
      message: "Fallen not found",
      status: 404,
    };
  }
  return {
    ok: true,
    message: "Fallen found",
    status: 200,
    data: response,
  };
}

export async function getAllFallen() {
  return await service.getAllFallen();
}

export async function addFallen(fallen) {
  return await service.addFallen(fallen);
}

export async function updateFallenById(fallen) {
    return await service.updateFallenById(fallen);
}

export async function deleteFallen(id) {
  return await service.deleteFallen(id);
}

export async function approveFallen(id) {
    return await service.approveFallen(id);
}

export async function rejectFallen(id, note) {
    return await service.rejectFallen(id, note);
}

export async function joinHobby(fallenId, hobby) {
  const session = await auth();

  if (!session?.user?.id) {
    console.log("Unauthorized");
    return { ok: false, status: 401, message: "Unauthorized" };
  }

  const userId = session.user.id;
  const isAlreadyJoined = await service.getFallen({
    _id: fallenId,
    hobbies: { $elemMatch: { name: hobby, continuers: userId } },
  });

  if (isAlreadyJoined)
    return { ok: false, message: "Not updated", status: 400 };

  const response = await service.updateFallen(
    { _id: fallenId, "hobbies.name": hobby },
    {
      $inc: { "hobbies.$.continueCount": 1 },
      $push: { "hobbies.$.continuers": userId },
    }
  );

  if (response.matchedCount == 0)
    return { ok: false, message: "Not found error", status: 404 };

  return { ok: true, message: "Updated Succes", status: 200 };
}
