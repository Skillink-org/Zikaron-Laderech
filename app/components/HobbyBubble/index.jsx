"use client";

import Image from "next/image";
import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import HobbyBubbleSkeleton from "../Skeletons/HobbyBubbleSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function HobbyBubble({
  dynamicBackgroundClassName = "",
  className = "",
  children = "טניס",
  plusMode = true,
  onClick,
  isClickable = true, // האם הבועה יכולה להיות לחיצה
  ...props
}) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  // פונקציית הלחיצה
  const handleClick = () => {
    if (!isClickable) return; // אם לא לחיץ, לא עושים כלום
    
    if (onClick) {
      // אם יש פונקציית onClick מבחוץ, משתמשים בה
      onClick();
    } else {
      // יצירת אובייקט פרמטרים חדש
      const params = new URLSearchParams();
      
      // הנקודה החשובה: אנחנו מגדירים את התחביב כפרמטר q
      // זה יחליף את השם שהיה בתיבת החיפוש בתחביב
      params.set("q", children);
      
      // שמירה על פרמטרים אחרים שאינם קשורים לחיפוש
      const currentParams = new URLSearchParams(searchParams);
      if (currentParams.has("sort")) {
        params.set("sort", currentParams.get("sort"));
      }

      router.push(`/fallen?${params.toString()}`, { scroll: false });
    }
  };

  // הוספת קלאס לציון האם לחיץ או לא
  const bubbleClass = `${styles.hobbyBubble} ${className} ${isClickable ? styles.clickable : ''}`;

  return (
    <>
      {rand ? (
        <DynamicBackground rand={rand} className={dynamicBackgroundClassName}>
          <div
            className={bubbleClass}
            onClick={handleClick}
            {...props}
          >
            <div className={styles.title}>{children}</div>
            {plusMode && (
              <div className={styles.plusWrapper}>
                <Image
                  src="/plusIcon.svg"
                  alt="Plus icon"
                  className={styles.Image}
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </DynamicBackground>
      ) : (
        <HobbyBubbleSkeleton />
      )}
    </>
  );
}