import { Suspense } from "react";
import styles from "./page.module.scss";
import { connectToDB } from "@/server/connect";
import FallenList from "../components/FallenList";
import SearchForm from "../components/SearchForm";
import Pagination from "../components/Pagination";
import TitleDivider from "../components/TitleDivider";
import { metadata as layoutMetadata } from "../layout";
import PopularHobbies from "../components/PopularHobbies";
import FallenListSkeleton from "../components/Skeletons/FallenListSkeleton";
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

  // Get params
  const params = await searchParams;
  const query = params.q || "";
  const currentPage = Number(params.page) || 1;

  // Configure pagination settings
  const limit = 10;
  const skip = (currentPage - 1) * limit;

  // Fetch fallen data based on query and pagination settings
  const { data, total } = query
    ? await getFilteredFallen(query, limit, skip)
    : await getAllFallen(limit, skip);

  // Calculate total pages based on the total number of fallen and the limit per page
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {/* Search section */}
      <SearchForm query={query} searchTrigger="change" />

      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* Hobbies filter section */}
      <PopularHobbies containerType="tag" />

      {/* Fallen list section */}
      <div className={styles.itemsContainer}>
        <Suspense fallback={<FallenListSkeleton limit={limit} />}>
          <FallenList fallen={data} />
        </Suspense>
      </div>

      {/* Pagination section */}
      <Pagination
        currentPage={total === 0 ? total : currentPage}
        totalPages={totalPages}
      />
    </>
  );
}
