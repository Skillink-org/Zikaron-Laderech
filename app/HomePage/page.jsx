"use client";
import styles from './style.module.scss';
import Image from 'next/image';
import HobbyList from './HobbyList';


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
  <div className={styles["search-border"]}>
   
  </div>
  <HobbyList/>

      {/* קטע ההצטרפות לעמוד הנופלים */}
      <div className={styles.memorySection}>
        <div className={styles.memoryTitle}>הצטרפו להנצחה</div>
        <div className={styles.memoryText}>
          יחד נמשיך את המורשת של יקירינו דרך התחביבים והסיפורים שהשאירו אחריהם
        </div>
        <button className={styles.memoryButton} onClick={() => window.location.href = '/all-fallen'}>
          לעמוד הנופלים
        </button>
      </div>
    </div>
  );
};
export default HomePage;
  