/*
  This component, made by Refael, displays the number of people who continue hobbies.

  It has two modes:
  1. Default mode - Shows the number of people continuing a specific hobby.
  2. SUM mode - Shows the total number of people continuing all hobbies.
*/
"use client";
import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";

export default function HobbyDataBubble({
  hobbyName = "טניס",
  hobbyContinuers = 136,
  hobbyContinuersSum = 230,
  fallenName = "מאי",
  sumMode = true,
  onClick,
}) {
  const rand = useRand();

  if (!rand) {
    return <div className={styles.loading}>loading...</div>;
  }

  return (
    <DynamicBackground
      rand={rand}
      className={styles.dynamicBackgroundContainer}
    >
      <div className={styles.hobbyDataBubble} onClick={onClick}>
        <div className={styles.hobbyContinuers}>
          {sumMode ? hobbyContinuersSum : hobbyContinuers}
        </div>
        {/* TODO: Add support for both feminine and masculine forms */}
        <div className={styles.hobbyText}>
          {sumMode
            ? ` ממשיכים בדרך של ${fallenName}`
            : `ממשיכים בתחביב ה${hobbyName} לזכר ${fallenName}`}
        </div>
      </div>
    </DynamicBackground>
  );
}
