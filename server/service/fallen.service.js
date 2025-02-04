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
  return fallen;
}

export async function getFilteredFallen(query) {
  return fallen.filter(
    (fallen) =>
      fallen.firstName.includes(query) ||
      fallen.lastName.includes(query) ||
      fallen.hobbies.includes(query)
  );
}

export async function getFallenById(id) {
  return fallen.find((fallen) => fallen.id == id);
}


export async function addFallen(fallen) {
  return await Fallen.create(fallen);
}

export async function updateFallen(fallen) {
  return await Fallen.findByIdAndUpdate(fallen.id, fallen);
}

export async function deleteFallen(id) {
  return await Fallen.findByIdAndDelete(id);
} 


// import Fallen from '../models/fallen';

// export const fallenService = {
//   async create(fallenData) {
//     try {
//       // המרת התחביבים למערך
//       const hobbies = fallenData.hobbies
//         .split(',')
//         .map(hobby => hobby.trim())
//         .filter(hobby => hobby);

//       // יצירת אובייקט חדש עם הנתונים המעובדים
//       const newFallen = new Fallen({
//         ...fallenData,
//         hobbies,
//         isAccepted: false
//       });

//       // שמירה במסד הנתונים
//       const savedFallen = await newFallen.save();
//       return savedFallen;
//     } catch (error) {
//       console.error('Error in fallenService.create:', error);
//       throw error;
//     }
//   }
// };
