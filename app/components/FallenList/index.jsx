import Link from "next/link";
import styles from "./style.module.scss";
import ProfileCard from "../ProfileCard";
import StatusMessage from "@/app/components/StatusMessage";

function FallenList({ fallen }) {
  const approvedFallen = fallen.filter((f) => f.status === "approved");

  return (
    <>
      {approvedFallen.length > 0 ? (
        approvedFallen.map((fallen) => (
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
