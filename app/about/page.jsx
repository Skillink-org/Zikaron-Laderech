import styles from "./page.module.scss";
import LargeBubble from "../components/LargeBubble";
import CustomBubble from "../components/CustomBubble";
import ImageWithTitle from "../components/ImageWithTitle";
import InvitationBubble from "../components/InvitationBubble/InvitationBubble";

export default function AboutPage() {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/profileImage.webp"}
        title="המסע שלנו"
        subtitle="יחד נוכל להמשיך את המסע של יקירינו ולהפוך את זכרם לפיסה חיה ומתמשכת"
      />

      {/* Free text section */}
      <CustomBubble className={styles.paragraphsContainer}>
        <p className={styles.paragraph}>
          "זיכרון לדרך" הוא מיזם ייחודי שנולד מתוך הצורך לשמר את זכרם של יקירינו
          שנפלו באירועי ה-7/10 ובמלחמה שאחריה, בדרך שונה ומשמעותית. המיזם מאפשר
          לנו להכיר את הנופלים דרך התחביבים והתשוקות שהיו חלק בלתי נפרד מחייהם,
          ולהמשיך את דרכם בצורה אקטיבית ומשמעותית.
        </p>

        <p className={styles.paragraph}>
          אנו מאמינים שכל תחביב, כל תשוקה וכל עניין שהיה חשוב ליקירינו, הוא חלק
          מהמורשת שהשאירו אחריהם. דרך הפלטפורמה שלנו, אנשים מכל רחבי הארץ יכולים
          להתחבר לסיפורים האישיים, לבחור תחביב שמדבר אליהם, ולהמשיך אותו כדרך
          להנצחה פעילה ומתמשכת.
        </p>

        <p className={styles.paragraph}>
          הפלטפורמה מאפשרת למשפחות לשתף את הסיפור האישי של יקיריהן, ולקהילה
          הרחבה להתחבר, להשתתף ולקחת חלק פעיל בהנצחה. כך נוצר גשר בין העבר
          לעתיד, בין הזיכרון למעשה, ובין האובדן להמשכיות.
        </p>
      </CustomBubble>

      {/* TODO: Replace with real data */}
      {/* Data bubbles section */}
      <div className={styles.dataBubbles}>
        <CustomBubble className={styles.dataBubble}>
          <p className={styles.dataNumber}>40</p>
          <p className={styles.dataText}>נופלים ונופלות מונצחים</p>
        </CustomBubble>
        <CustomBubble className={styles.dataBubble}>
          <p className={styles.dataNumber}>120</p>
          <p className={styles.dataText}>תחביבים מתועדים</p>
        </CustomBubble>
        <CustomBubble className={styles.dataBubble}>
          <p className={styles.dataNumber}>2,300</p>
          <p className={styles.dataText}>מנציחים ממשיכים בדרכם</p>
        </CustomBubble>
      </div>

      {/* Invitation section */}
      <InvitationBubble />
    </>
  );
}
