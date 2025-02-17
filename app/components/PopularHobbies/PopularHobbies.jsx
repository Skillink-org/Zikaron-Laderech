import React from "react";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";

// TODO: Replace with real popular hobbies from the database
const hobbies = ["שחיה", "סריגה", "אפיה", "ריצה", "שירה", "טניס"];

export default function PopularHobbies() {
  return (
    <div className={styles.hobbiesContainer}>
      {hobbies.map((hobby, index) => (
        <HobbyBubble key={index} plusMode={false} className={styles.bubble}>
          {hobby}
        </HobbyBubble>
      ))}
    </div>
  );
}
