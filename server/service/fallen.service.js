import { transporter } from "@/lib/email";
import { getBaseUrl } from "@/lib/baseUrl";
import { serializer } from "@/lib/serializer";
import Fallen from "@/server/models/fallen.model";

export async function getAllFallen(limit = 0, skip = 0, status = "approved") {
  const matchStage = status === "all" ? {} : { status: status };

  const pipeline = [
    { $match: matchStage },
    {
      $facet: {
        total: [{ $count: "count" }],
        data: [{ $skip: skip }],
      },
    },
  ];

  if (limit > 0) {
    pipeline[1].$facet.data.push({ $limit: limit });
  }

  const result = await Fallen.aggregate(pipeline);

  return {
    total: result[0].total[0]?.count || 0,
    data: serializer(result[0].data),
  };
}

export async function getFilteredFallen(query, limit = 0, skip = 0) {
  const pipeline = [
    {
      $match: {
        status: "approved",
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
      },
    },
    {
      $facet: {
        total: [{ $count: "count" }],
        data: [{ $skip: skip }],
      },
    },
  ];

  if (limit > 0) {
    pipeline[1].$facet.data.push({ $limit: limit });
  }

  const result = await Fallen.aggregate(pipeline);

  return {
    total: result[0].total[0]?.count || 0,
    data: serializer(result[0].data),
  };
}

export async function getFilteredFallenByNameAndStatus(query, limit = 0, skip = 0, status = "approved") {
  const matchStage = status === "all" ? {} : { status };

  const pipeline = [
    {
      $match: {
        ...matchStage,
        $or: [
          { firstName: { $regex: query, $options: "i" } },
          { lastName: { $regex: query, $options: "i" } },
          
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
      },
    },
    {
      $facet: {
        total: [{ $count: "count" }],
        data: [{ $skip: skip }],
      },
    },
  ];

  if (limit > 0) {
    pipeline[1].$facet.data.push({ $limit: limit });
  }

  const result = await Fallen.aggregate(pipeline);

  return {
    total: result[0].total[0]?.count || 0,
    data: serializer(result[0].data),
  };
}

export async function getPopularHobbies() {
  return await Fallen.aggregate([
    { $match: { status: "approved" } },
    { $unwind: "$hobbies" },
    {
      $group: {
        _id: "$hobbies.name",
        fallenCount: { $sum: 1 },
      },
    },
    { $sort: { fallenCount: -1, _id: 1 } },
    { $limit: 10 },
  ]);
}

export async function getFallenCount() {
  return await Fallen.countDocuments({ status: "approved" });
}

export async function getHobbiesCount() {
  const result = await Fallen.aggregate([
    { $match: { status: "approved" } },
    { $unwind: "$hobbies" },
    { $group: { _id: "$hobbies.name" } },
    { $count: "count" },
  ]);

  return result[0]?.count || 0;
}

export async function getContinuersCount() {
  const result = await Fallen.aggregate([
    { $match: { status: "approved" } },
    { $unwind: "$hobbies" },
    { $unwind: "$hobbies.continuers" },
    { $group: { _id: "$hobbies.continuers" } },
    { $count: "count" },
  ]);

  return result[0]?.count || 0;
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

    return serializer(fallen);
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
    if (!fallen.email) throw new Error("No email found for this record");

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: fallen.email,
      subject: "Profile Rejected",
      text: `Your profile has been rejected.\n\nReason: ${note}\n\nIf you believe this is a mistake, please contact us.`,
    };

    await transporter.sendMail(mailOptions);

    return serializer(fallen);
  } catch (error) {
    console.error("Error in rejectFallen:", error);
    throw error;
  }
}
