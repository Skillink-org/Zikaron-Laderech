import styles from "./page.module.scss";
import Button from "../components/Button";
import SearchInput from "../components/SearchInput";
import CustomBubble from "../components/CustomBubble";
import TitleDivider from "../components/TitleDivider";

export default function AllFallenPage() {
  return (
    <>
      <CustomBubble className={styles.customBubble}>
        <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
        <div className={styles.searchContainer}>
          <SearchInput className={styles.searchInput} />
          <Button className={styles.searchButton}>חיפוש</Button>
        </div>
      </CustomBubble>
      <TitleDivider title={"סינון לפי תחביבים נפוצים"} />

      {/* TODO: Add HobbyTags here */}
      {/* TODO: Iterate through fallens and render ProfileCars */}
    </>
  );
}
