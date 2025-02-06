import { serializer } from "@/lib/serializer";
import Fallen from "@/server/models/fallen.model";

export async function getAllFallen() {
  return serializer(await Fallen.find({}));
}

export async function getFilteredFallen(query) {
  return await Fallen.find({
    $or: [
      { firstName: { $regex: query, $options: "i" } },
      { lastName: { $regex: query, $options: "i" } },
      {
        hobbies: {
          $elemMatch: { name: { $regex: query, $options: "i" } },
        },
      },
    ],
  });
}

export async function getFallenById(id) {
  try {
    return await Fallen.findById(id);
  } catch (error) {
    console.log(error);
  }
}

// export async function addFallen(fallen) {
//   return await Fallen.create(fallen);
// }

export async function updateFallen(fallen) {
  return await Fallen.findByIdAndUpdate(fallen.id, fallen);
}

export async function deleteFallen(id) {
  return await Fallen.findByIdAndDelete(id);
}

export async function addFallen(fallenData) {
  try {
    // Basic validation
    if (!fallenData.firstName || !fallenData.lastName) {
      throw new Error("Missing first name or last name");
    }

    // Ensure dates are valid
    const birthDate = new Date(fallenData.birthDate);
    const deathDate = new Date(fallenData.deathDate);

    if (isNaN(birthDate.getTime()) || isNaN(deathDate.getTime())) {
      throw new Error("Invalid birth or death date");
    }

    // Create a new record
    const fallen = await Fallen.create({
      ...fallenData,
      birthDate,
      deathDate,
      status: "pending"
    });

    return fallen;
  } catch (error) {
    console.error("Error in addFallen:", error);
    throw error;
  }
}
