import { Suspense } from "react";
import styles from "./page.module.scss";
import FallenList from "../components/FallenList";
import SearchForm from "../components/SearchForm";
import TitleDivider from "../components/TitleDivider";
import { metadata as layoutMetadata } from "../layout";
import PopularHobbies from "../components/PopularHobbies";
import FallenListSkeleton from "../components/Skeletons/FallenListSkeleton";

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
  // Get params
  const params = await searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;

  // Configure pagination's limit
  const limit = 10;

  return (
    <>
      {/* Search section */}
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchForm query={query} searchTrigger="change" />
      </Suspense>

      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* Hobbies filter section */}
      <Suspense fallback={<div>Loading hobbies filter...</div>}>
        <PopularHobbies displayMode="fallen" isClickable={true} />
      </Suspense>
      {/* Fallen list and pagination section */}
      <div className={styles.itemsContainer}>
        <Suspense fallback={<FallenListSkeleton limit={limit} />}>
          <FallenList query={query} currentPage={currentPage} limit={limit} />
        </Suspense>
      </div>
    </>
  );
}
