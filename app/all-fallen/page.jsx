import styles from "./page.module.scss";
import Button from "../components/Button";
import HobbyTag from "../components/HobbyTag";
import SearchInput from "../components/SearchInput";
import ProfileCard from "../components/ProfileCard";
import CustomBubble from "../components/CustomBubble";
import TitleDivider from "../components/TitleDivider";

export default async function AllFallenPage() {
  // TODO: Replace dummy data in real hobbies from API
  const hobbies = ["טניס", "שירה", "ריצה", "אפיה", "סריגה", "שחיה"];

  // TODO: Replace dummy data in real fallens from API
  const fallens = [
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

  return (
    <div className={styles.container}>
      {/* Search and filter area */}
      <CustomBubble classNames={styles.customBubble}>
        <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
        <div className={styles.searchContainer}>
          <SearchInput className={styles.searchInput} />
          <Button className={styles.searchButton}>חיפוש</Button>
        </div>
      </CustomBubble>
      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* Hobbies list */}
      <div className={styles.itemsContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyTag hobby={hobby} key={index} />
        ))}
      </div>

      {/* Fallen list */}
      <div className={styles.itemsContainer}>
        {fallens.map((fallen) => (
          <ProfileCard
            firstName={fallen.firstName}
            lastName={fallen.lastName}
            birthYear={fallen.birthYear}
            deathYear={fallen.deathYear}
            imageUrl={fallen.imageUrl}
            key={fallen.id}
          />
        ))}
      </div>
    </div>
  );
}
