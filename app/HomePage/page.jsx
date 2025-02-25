"use client";
import styles from './style.module.scss';
import Image from 'next/image';
import HobbyList from './HobbyList';
import SearchForm from '../components/SearchForm/SearchForm';
import CustomBubble from "../components/CustomBubble";
import TitleDivider from "../components/TitleDivider";

// TODO-YOSEF: dont make it use client - the client part move outside the component
// TODO-YOSEF: button should be a Link
// TODO-YOSEF: home gape need to be at top level - replace the default one

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
  
 {/* Search section */}
  
  <CustomBubble className={styles.customBubble}>
        <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
        <SearchForm query={q} />
      </CustomBubble>
      <TitleDivider title={"סינון לפי תחביבים נפוצים"}/>
  
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
  
