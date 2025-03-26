import Link from "next/link";
import Pagination from "../Pagination";
import styles from "./style.module.scss";
import ProfileCard from "../ProfileCard";
import { connectToDB } from "@/server/connect";
import StatusMessage from "@/app/components/StatusMessage";
import {
  getAllFallen,
  getFilteredFallen,
} from "@/server/service/fallen.service";

async function FallenList({ query, currentPage, limit }) {
  await connectToDB();

  const skip = (currentPage - 1) * limit;

  // Fetch fallen data based on query and pagination settings
  const { data, total } = query
    ? await getFilteredFallen(query, limit, skip)
    : await getAllFallen(limit, skip);

  // Calculate total pages based on the total number of fallen and the limit per page
  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {data.length > 0 ? (
        data.map((fallen) => (
          <Link
            key={fallen._id}
            className={styles.cardBackground}
            href={`/all-fallen/${String(fallen.slug)}`}
          >
            <ProfileCard fallen={fallen} />
          </Link>
        ))
      ) : (
        <StatusMessage
          message="לא נמצאו נופלים התואמים את החיפוש"
          type="error"
        />
      )}

      <Pagination
        currentPage={total === 0 ? total : currentPage}
        totalPages={totalPages}
      />
    </>
  );
}

export default FallenList;
