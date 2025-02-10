import Link from "next/link";
import styles from "./page.module.scss";
import ProfileCard from "../components/ProfileCard";
import StatusMessage from "@/app/components/StatusMessage";

function FallenList({ fallen }) {
  return (
    <>
      {fallen.length > 0 ? (
        fallen.map((fallen) => (
          <Link
            key={fallen._id}
            className={styles.cardBackground}
            href={`/all-fallen/${String(fallen._id)}`}
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
    </>
  );
}

export default FallenList;