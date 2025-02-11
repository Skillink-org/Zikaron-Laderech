"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.scss";
import Button from "./components/Button";
import HobbyList from "./HomePage/HobbyList";

const HomePage = () => {
  return (
    <div className={styles["Home-container"]}>
      <div className={styles["header-image"]}>
        <Image
          src="/Home-Page.png"
          alt="דף הבית"
          width={1400}
          height={100}
          className={styles["Home-image"]}
        />
      </div>
      <div className={styles["search-border"]}></div>
      <HobbyList />

      {/* קטע ההצטרפות לעמוד הנופלים */}
      <div className={styles.memorySection}>
        <div className={styles.memoryTitle}>הצטרפו להנצחה</div>
        <div className={styles.memoryText}>
          יחד נמשיך את המורשת של יקירינו דרך התחביבים והסיפורים שהשאירו אחריהם
        </div>
        <Button className={styles.memoryButton}>
          <Link href="/all-fallen">לעמוד הנופלים</Link>
        </Button>
      </div>
    </div>
  );
};
export default HomePage;
