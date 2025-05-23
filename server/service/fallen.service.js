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

export async function getPopularHobbies(limit = 10) {
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
    { $limit: limit },
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

// async function generateSlug(firstName, lastName) {

//   let baseSlug = `${firstName} ${lastName}`.replace(/\s+/g, '-');
//   let finalSlug = baseSlug;
//   let counter = 1;

//   while (await Fallen.findOne({ slug: finalSlug })) {
//     finalSlug = `${baseSlug} ${counter}`.replace(/\s+/g, '-');
//     counter++;
//   }

//   return finalSlug
//     .toLowerCase()
//     .replace(/\s+/g, '-');
// };

async function generateSlug(firstName, lastName) {
  // Map for converting Hebrew characters to Latin
  function hebrewToLatinInitials(name) {
    const hebrewToLatinMap = {
      'א': 'a', 'ב': 'b', 'ג': 'g', 'ד': 'd', 'ה': 'h', 'ו': 'v', 'ז': 'z', 
      'ח': 'ch', 'ט': 't', 'י': 'y', 'כ': 'k', 'ל': 'l', 'מ': 'm', 'נ': 'n', 
      'ס': 's', 'ע': 'a', 'פ': 'p', 'צ': 'ts', 'ק': 'k', 'ר': 'r', 'ש': 'sh', 'ת': 't'
    };
    
    // Get first character of the name
    if (!name || name.length === 0) return '';
    const firstChar = name.charAt(0);
    return hebrewToLatinMap[firstChar] || firstChar;
  }
  
  // Create initials from names
  const firstInitial = hebrewToLatinInitials(firstName);
  const lastInitial = hebrewToLatinInitials(lastName);
  const baseSlug = `${firstInitial}${lastInitial}`;
  
  // Find the last sequential number used for these initials
  const existingSlugs = await Fallen.find({ 
    slug: new RegExp(`^${baseSlug}\\d+$`) 
  }).sort({ slug: -1 }).limit(1);
  
  // Determine the next counter number
  let counter = 1;
  if (existingSlugs.length > 0) {
    const lastSlug = existingSlugs[0].slug;
    const lastNumber = parseInt(lastSlug.replace(baseSlug, ''), 10);
    counter = isNaN(lastNumber) ? 1 : lastNumber + 1;
  }
  
  // Generate final slug
  return `${baseSlug}${counter}`.toLowerCase();
}

export async function addFallen(fallenData) {
  try {
    // Basic validation
    if (!fallenData.firstName || !fallenData.lastName) {
      throw new Error("Missing first name or last name");
    }

    // Check if fallen already exists
    const existingFallen = await checkExistingFallen(fallenData.firstName, fallenData.lastName, fallenData.birthDate, fallenData.deathDate);
    if (existingFallen) {
      throw new Error(`נופל בשם ${fallenData.firstName} ${fallenData.lastName} עם תאריכי לידה ופטירה דומים כבר קיים במערכת`);
    }

    // Ensure dates are valid
    const createdAt = new Date();

    const birthDate = new Date(fallenData.birthDate);
    const deathDate = new Date(fallenData.deathDate);

    if (isNaN(birthDate.getTime()) || isNaN(deathDate.getTime())) {
      throw new Error("Invalid birth or death date");
    }

    const slug = await generateSlug(fallenData.firstName, fallenData.lastName);

    // Create a new record
    const fallen = await Fallen.create({
      ...fallenData,
      createdAt,
      birthDate,
      deathDate,
      status: "pending",
      slug: slug,
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

export async function checkExistingFallen(firstName, lastName, birthDate, deathDate) {
  try {
    // Convert dates to Date objects for comparison
    const birthDateObj = new Date(birthDate);
    const deathDateObj = new Date(deathDate);

    const existingFallen = await Fallen.findOne({
      firstName: { $regex: new RegExp(`^${firstName}$`, 'i') },
      lastName: { $regex: new RegExp(`^${lastName}$`, 'i') },
      $or: [
        // Check if dates match exactly
        {
          birthDate: birthDateObj,
          deathDate: deathDateObj
        },
        // Check if dates are within a 2-day range (to account for different time zones or data entry variations)
        {
          $and: [
            { 
              birthDate: { 
                $gte: new Date(birthDateObj.getTime() - 2 * 24 * 60 * 60 * 1000),
                $lte: new Date(birthDateObj.getTime() + 2 * 24 * 60 * 60 * 1000)
              }
            },
            {
              deathDate: {
                $gte: new Date(deathDateObj.getTime() - 2 * 24 * 60 * 60 * 1000),
                $lte: new Date(deathDateObj.getTime() + 2 * 24 * 60 * 60 * 1000)
              }
            }
          ]
        }
      ]
    });
    
    return existingFallen;
  } catch (error) {
    console.error("Error checking existing fallen:", error);
    throw error;
  }
}
