import { Suspense } from "react";
import styles from "./page.module.scss";
import HobbyTag from "../components/HobbyTag";
import { connectToDB } from "@/server/connect";
import FallenList from "../components/FallenList";
import TitleDivider from "../components/TitleDivider";
import { metadata as layoutMetadata } from "../layout";
import SearchForm from "../components/SearchForm/SearchForm";
import {
  getAllFallen,
  getFilteredFallen,
} from "@/server/service/fallen.service";

export const metadata = {
  title: "כל הנופלים",
  description:
    "גלו והנציחו את הגיבורים שנפלו בהתקפת הטרור ב-7 באוקטובר 2023. המשיכו את התחביבים שלהם וקראו את הסיפורים האישיים שלהם, תחביביהם וכיצד נשמר זכרם. סננו לפי שם או תחביב כדי לגלות את השפעתם.",
  keywords: [
    ...layoutMetadata.keywords,
    "Fallen List",
    "Filter",
    "רשימת הנופלים",
    "סינון",
  ],
  authors: [{ name: "Yakov Vazan", url: "https://github.com/YakovVazan" }],
};

export default async function AllFallenPage({ searchParams }) {
  await connectToDB();

  const q = (await searchParams).q || "";
  const fallen = q ? await getFilteredFallen(q) : await getAllFallen();

  // TODO: Replace dummy data in real popular hobbies from API
  const hobbies = ["טניס", "שירה", "ריצה", "אפיה", "סריגה", "שחיה"];

  return (
    <>
      {/* Search section */}
      <SearchForm query={q} />

      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* Hobbies filter section */}
      <div className={styles.itemsContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyTag hobby={hobby} key={index} />
        ))}
      </div>

      {/* Fallen list section */}
      <div className={styles.itemsContainer}>
        <Suspense fallback={<p>טוען...</p>}>
          <FallenList fallen={fallen} />
        </Suspense>
      </div>
    </>
  );
}
