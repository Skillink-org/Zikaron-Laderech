import { Suspense } from "react";
import FallenList from "./FallenList";
import styles from "./page.module.scss";
import Button from "../components/Button";
import { getBaseUrl } from "@/lib/baseUrl";
import HobbyTag from "../components/HobbyTag";
import SearchInput from "../components/SearchInput";
import CustomBubble from "../components/CustomBubble";
import TitleDivider from "../components/TitleDivider";

export default async function AllFallenPage({ searchParams }) {
  const q = (await searchParams).q || "";

  // TODO-YOSEF: connect to mongodb
  // TODO-YOSEF: dont use fetch - use the service directly
  const baseUrl = getBaseUrl();
  const fallenPromise = (await fetch(`${baseUrl}/api/fallen?q=${q}`)).json();

  // TODO: Replace dummy data in real hobbies from API
  const hobbies = ["טניס", "שירה", "ריצה", "אפיה", "סריגה", "שחיה"];

  return (
    <>
      {/* Search and filter area */}
      <CustomBubble className={styles.customBubble}>
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
