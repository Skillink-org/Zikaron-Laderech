import Link from "next/link";
import styles from "./not-found.module.scss";
import Button from "./components/Button";
import TitleDivider from "./components/TitleDivider";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <p className={styles.header}>404</p>
      <p className={styles.subheader}>הדף המבוקש לא נמצא</p>
      <TitleDivider />
      <Button>
        <Link href="/">נווט בחזרה הביתה</Link>
      </Button>
    </div>
  );
}
