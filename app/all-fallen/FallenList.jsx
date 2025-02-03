import { use } from "react";
import styles from "./page.module.scss";
import ProfileCard from "../components/ProfileCard";

function FallenList({ fallenPromise }) {
  const fallen = use(fallenPromise);

  return (
    <>
      {fallen.map((fallen) => (
        <div className={styles.cardBackground} key={fallen.id}>
          <ProfileCard fallen={fallen} />
        </div>
      ))}
    </>
  );
}

export default FallenList;
