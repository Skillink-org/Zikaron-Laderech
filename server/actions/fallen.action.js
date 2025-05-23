"use server";

import { auth } from "@/auth";
import * as service from "@/server/service/fallen.service.js";
import Fallen from "../models/fallen.model";

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

export async function getAllFallen(query, limit, skip, status) {
  return await service.getAllFallen(query, limit, skip, status);
}

export async function getFilteredFallen(query, limit, skip) {
  return await service.getFilteredFallen(query, limit, skip);
}

export async function getFilteredFallenByNameAndStatus(query, limit, skip, status) {
  return await service.getFilteredFallen(query, limit, skip, status);
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
  try {
    // Call to the original service function
    const fallen = await Fallen.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!fallen) throw new Error("Fallen not found");
    
    try {
      // Using function from email.js
      const { sendApprovalNotification } = await import('@/lib/email');
      await sendApprovalNotification(fallen, fallen.slug);
    } catch (emailError) {
      console.error("Error sending approval email:", emailError);
      // Continue even if there's an email sending error
    }

    // Important! Import serializer function
    const { serializer } = await import("@/lib/serializer");
    return serializer(fallen);
  } catch (error) {
    console.error("Error in approveFallen:", error);
    throw error;
  }
}

export async function rejectFallen(id, note) {
  try {
    const fallen = await Fallen.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!fallen) throw new Error("Fallen not found");
    
    try {
      // Using function from email.js
      const { sendRejectionNotification } = await import('@/lib/email');
      await sendRejectionNotification(fallen, note);
    } catch (emailError) {
      console.error("Error sending rejection email:", emailError);
    }

    // Important! Import serializer function
    const { serializer } = await import("@/lib/serializer");
    return serializer(fallen);
  } catch (error) {
    console.error("Error in rejectFallen:", error);
    throw error;
  }
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
