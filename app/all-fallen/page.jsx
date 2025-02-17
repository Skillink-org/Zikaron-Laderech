import { Suspense } from "react";
import styles from "./page.module.scss";
import FallenList from "../components/FallenList";
import TitleDivider from "../components/TitleDivider";
import { metadata as layoutMetadata } from "../layout";
import SearchForm from "../components/SearchForm/SearchForm";
import PopularHobbies from "../components/PopularHobbies/PopularHobbies";

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
  const query = (await searchParams).q || "";

  return (
    <>
      {/* Search section */}
      <SearchForm query={query} searchTrigger="change" />

      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* Hobbies filter section */}
      <PopularHobbies containerType="tag" />

      {/* Fallen list section */}
      <div className={styles.itemsContainer}>
        <Suspense fallback={<p>טוען...</p>}>
          <FallenList query={query} />
        </Suspense>
      </div>
    </>
  );
}
