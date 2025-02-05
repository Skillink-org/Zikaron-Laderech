"use client";
import React from "react";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import CustomBubble from "../components/CustomBubble";
import LargeBubble from "../components/LargeBubble";
import ImageWithTitle from "../components/ImageWithTitle";

export default function AboutPage() {
  const router = useRouter();

  const handleJoinClick = () => {
    router.push("/add-fallen");
  };

  return (
    <div>
      <div>
        <div className={`${styles.imageWithTitle} `}>
          <ImageWithTitle
            imageUrl="https://www.picshare.co.il/s_pictures/img62733.jpg"
            title="מיזם"
            subtitle="אודות"
          />
        </div>

        <CustomBubble className={styles['element-with-spacing']}>
          <p>יוור נימרול שפיץ בלאקרין לורפט דומק טולפין. גרוי לופצנין נימרומפ בייסטר יאפ טולפריק סטרומרול. דופלינק בלאורפן וצרופינק קלוי תראפ. גלטור רומפניק שפלאס גראפינג קויילנפ טולפס.</p>
          <p>לאופארק טולפריק לקה פסטורין בניפר פלורטי לארסן תוטפולינק קלורין. דופרמלייט גובצור מימלפ פשטורפין גלפול ברמנופטר ניבקל. גרוטפינק דלפרין בורסטורפ תולפארק ביופצטרל.</p>
          <p>לורפט דוםקל פסטורי לורפט יערטל שבניפ. גלורריק פסטנורף עלול מארם רובנה קלוי גינורפ נמלז. גרומפניק טופלינק להפטור פילין קוברט נשדלט גריפון.</p>
          <p>לארפט מינטול כארפר שניפר טימלקה פינדרולטר תרמלשט. קפראינר לתולינפ לדובפרינק בלורולפריט לדולפום גהפלטוק.</p>
          <p>לאורפט כלפייני גרביט נימרולס קטור טיימלופן שפולש. גראפונרקט לביברף שטוולפ קפינטל גרינום להופס.</p>
          <p>סלאפנט סולפינק בשאנן פרנוטפ טימפלור גרופניק. לאורפש פניפר שקופה לאורפלין גראזניק מינלואפר קלאברניפ.</p>
          <p>גרופנרלין דמופלאש שפיולר עלבריין קרוש סופרנס. פלוספינק אופאל נוקירנט דומפנול רייטורופ טופלר.</p>
        </CustomBubble>

        <div className={`${styles.bubblesContainer} ${styles['element-with-spacing']}`}>
          <CustomBubble className={styles['element-with-spacing']}>
            <h3>כותרת בועה 1</h3>
            <p>תוכן בועה 1</p>
          </CustomBubble>
          <CustomBubble className={styles['element-with-spacing']}>
            <h3>כותרת בועה 2</h3>
            <p>תוכן בועה 2</p>
          </CustomBubble>
          <CustomBubble className={styles['element-with-spacing']}>
            <h3>כותרת בועה 3</h3>
            <p>תוכן בועה 3</p>
          </CustomBubble>
        </div>

        <LargeBubble
          title="הצטרפו להנצחה"
          subtitle="הצטרפו אלינו והיו חלק מההצלחה"
          buttonText="הצטרף עכשיו"
          onButtonClick={handleJoinClick}
        />
      </div>
    </div>
  );
}
