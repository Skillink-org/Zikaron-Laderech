import styles from "./page.module.scss";
import ProfileCard from "../components/ProfileCard";
import StatusMessage from "@/app/components/StatusMessage";

function FallenList({ fallen }) {
  return (
    <>
      {fallen.length > 0 ? (
        fallen.map((fallen) => (
          <div className={styles.cardBackground} key={fallen.id}>
            <ProfileCard fallen={fallen} />
          </div>
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
