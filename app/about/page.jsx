import styles from "./page.module.scss";
import CustomBubble from "../components/CustomBubble";
import { metadata as layoutMetadata } from "../layout";
import ImageWithTitle from "../components/ImageWithTitle";
import InvitationBubble from "../components/InvitationBubble";
import DataBubbles from "../components/DataBubbles";
import { Suspense } from "react";

export const metadata = {
  title: "אודות",
  description:
    "למדו על מטרת הפרויקט 'כל הנופלים' וכיצד הוא נועד להנציח את הגיבורים שנפלו בהתקפת הטרור ב-7 באוקטובר 2023. גלו את הרקע, החזון והדרכים בהן תוכלו לתרום ולשמר את זכרם.",
  keywords: [
    ...layoutMetadata.keywords,
    "About",
    "Project Information",
    "אודות",
    "מידע על הפרויקט",
  ],
  authors: [{ name: "Yakov Vazan", url: "https://github.com/YakovVazan" }],
};

export default function AboutPage() {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/AboutHero.webp"}
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

      {/* Data bubbles section - now with Suspense */}
      <Suspense fallback={<div className={styles.dataBubbles}>טוען נתונים...</div>}>
        <DataBubbles />
      </Suspense>

      {/* Invitation section */}
      <InvitationBubble />
    </>
  );
}