// TODO: Replace dummy data in real data from DB using the appropriate model
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
    (fallen) => fallen.firstName === query || fallen.hobbies.includes(query)
  );
}
