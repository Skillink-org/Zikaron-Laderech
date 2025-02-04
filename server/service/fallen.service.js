import Fallen from "../models/fallen";

const fallen = [
  {
    id: 0,
    firstName: "אביב",
    lastName: "כהן",
    hobbies: ["טניס", "שירה"],
    birthYear: "1990",
    deathYear: "2023",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 1,
    firstName: "דניאל",
    lastName: "כהן",
    hobbies: ["ריצה", "אפיה"],
    birthYear: "1990",
    deathYear: "2023",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 2,
    firstName: "איתי",
    lastName: "כהן",
    hobbies: ["סריגה", "שחיה"],
    birthYear: "1990",
    deathYear: "2023",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 3,
    firstName: "מיכאל",
    lastName: "לוי",
    hobbies: ["פנינג", "קריאה"],
    birthYear: "1985",
    deathYear: "2021",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 4,
    firstName: "רות",
    lastName: "מזרחי",
    hobbies: ["יוגה", "מטבח"],
    birthYear: "1992",
    deathYear: "2022",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 5,
    firstName: "יוסי",
    lastName: "רבינוביץ",
    hobbies: ["שחמט", "טיולים"],
    birthYear: "1980",
    deathYear: "2024",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 6,
    firstName: "שרית",
    lastName: "ברק",
    hobbies: ["צילום", "סדנאות יצירה"],
    birthYear: "1993",
    deathYear: "2025",
    imageUrl: "/profileImage.webp",
  },
  {
    id: 7,
    firstName: "נעם",
    lastName: "אברהם",
    hobbies: ["רכיבה על אופניים", "הדפסה תלת-ממד"],
    birthYear: "1991",
    deathYear: "2022",
    imageUrl: "/profileImage.webp",
  },
];

export async function getAllFallen() {
  return await Fallen.find({});
}

export async function getFilteredFallen(query) {
  return Fallen.filter(
    (fallen) =>
      fallen.firstName.includes(query) ||
      fallen.lastName.includes(query) ||
      fallen.hobbies.includes(query)
  );
}

export async function getFallenById(id) {
  return fallen.find((fallen) => fallen.id == id);
}

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
      throw new Error('Missing first name or last name');
    }

    // Ensure dates are valid
    const birthDate = new Date(fallenData.birthDate);
    const deathDate = new Date(fallenData.deathDate);
    
    if (isNaN(birthDate.getTime()) || isNaN(deathDate.getTime())) {
      throw new Error('Invalid birth or death date');
    }

    // Create a new record
    const fallen = await Fallen.create({
      ...fallenData,
      birthDate,
      deathDate,
      isAccepted: false
    });

    return fallen;
  } catch (error) {
    console.error('Error in addFallen:', error);
    throw error;
  }
}