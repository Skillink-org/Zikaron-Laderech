import Link from "next/link";
import styles from "./page.module.scss";
import Button from "./components/Button";
import ImageWithTitle from "./components/ImageWithTitle";
import SearchForm from "./components/SearchForm/SearchForm";
import PopularHobbies from "./components/PopularHobbies/PopularHobbies";

const HomePage = () => {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/profileImage.webp"}
        title="לכל תחביב יש שם"
        subtitle="פלטפורמה המאפשרת להכיר את התחביבים שהיו חשובים לנופלי ה-7/10 והמלחמה ולהמשיך אותם לזכרם. דרך סיפורים אישיים, תמונות ותחביבים, כל אחד יכול לקחת חלק בהנצחה פעילה."
      />

      {/* Search section */}
      {/* TODO: change search from onchange to onclick with search button instead of reset */}
      <SearchForm />

      {/* Popular hobbies section */}
      <PopularHobbies />

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
    </>
  );
};
export default HomePage;
