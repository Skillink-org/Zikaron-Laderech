import { transporter } from "@/lib/email";
import { getBaseUrl } from "@/lib/baseUrl";
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
      {
        $expr: {
          $regexMatch: {
            input: { $concat: ["$firstName", " ", "$lastName"] },
            regex: query,
            options: "i",
          },
        },
      },
    ],
  });
}

export async function getPopularHobbies() {
  const result = serializer(
    await Fallen.aggregate([
      { $unwind: "$hobbies" },
      {
        $group: {
          _id: "$hobbies.name",
          fallenCount: { $sum: 1 },
        },
      },
      { $sort: { fallenCount: -1 } },
      { $limit: 10 },
    ])
  );

  return result;
}

export async function getFallenById(id) {
  try {
    return await Fallen.findById(id).then((doc) => serializer(doc));
  } catch (error) {
    console.log(error);
  }
}

export async function getFallen(filter) {
  try {
    return await Fallen.findOne(filter).then((doc) => serializer(doc));
  } catch (error) {
    console.log(error);
  }
}

// export async function addFallen(fallen) {
//   return await Fallen.create(fallen);
// }

export async function updateFallenById(fallen) {
  return await Fallen.findByIdAndUpdate(fallen._id, fallen, { new: true });
}

export async function updateFallen(filter, update) {
  try {
    return await Fallen.updateOne(filter, update);
  } catch (error) {
    console.log(error);
  }
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
      status: "pending",
    });

    return fallen;
  } catch (error) {
    console.error("Error in addFallen:", error);
    throw error;
  }
}

export async function approveFallen(id) {
  try {
    const fallen = await Fallen.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!fallen) throw new Error("Fallen not found");
    if (!fallen.email) throw new Error("No email found for this record");

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: fallen.email,
      subject: "Profile Approved",
      text: `The profile has been approved.\n\nView it here: ${getBaseUrl()}/all-fallen/${id}`,
    };

    await transporter.sendMail(mailOptions);

    return fallen;
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
    if (!fallen.email) throw new Error("No email found for this record");

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: fallen.email,
      subject: "Profile Rejected",
      text: `Your profile has been rejected.\n\nReason: ${note}\n\nIf you believe this is a mistake, please contact us.`,
    };

    await transporter.sendMail(mailOptions);

    return fallen;
  } catch (error) {
    console.error("Error in rejectFallen:", error);
    throw error;
  }
}
