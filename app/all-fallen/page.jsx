import { Suspense, use } from "react";
import styles from "./page.module.scss";
import Button from "../components/Button";
import HobbyTag from "../components/HobbyTag";
import SearchInput from "../components/SearchInput";
import ProfileCard from "../components/ProfileCard";
import CustomBubble from "../components/CustomBubble";
import TitleDivider from "../components/TitleDivider";

export default async function AllFallenPage({ searchParams }) {
  const  q = (await searchParams).q || "";
  // TODO: Replace dummy data in real hobbies from API
  const hobbies = ["טניס", "שירה", "ריצה", "אפיה", "סריגה", "שחיה"];

  // TODO: Generlize base URL depending on the environment
  const fallenPromise = (
    await fetch(`http://localhost:3000/api/fallen?q=${q}`)
  ).json();

  return (
    <>
      {/* Search and filter area */}
      <CustomBubble classNames={styles.customBubble}>
        <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
        <div className={styles.searchContainer}>
          <SearchInput className={styles.searchInput} initialValue={q} />
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
        <Suspense fallback={<p>טוען...</p>}>
          <FallenList fallenPromise={fallenPromise} />
        </Suspense>
      </div>
    </>
  );
}

// TODO: Consider moving to a separate file
function FallenList({ fallenPromise }) {
  const fallen = use(fallenPromise);

  return (
    <>
      {fallen.map((fallen) => (
        <div className={styles.cardBackground} key={fallen.id}>
          <ProfileCard
            firstName={fallen.firstName}
            lastName={fallen.lastName}
            birthYear={fallen.birthYear}
            deathYear={fallen.deathYear}
            imageUrl={fallen.imageUrl}
          />
        </div>
      ))}
    </>
  );
}
