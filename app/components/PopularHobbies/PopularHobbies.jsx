import React from "react";
import HobbyTag from "../HobbyTag";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";

// TODO: Replace with real popular hobbies from the database
const hobbies = ["שחיה", "סריגה", "אפיה", "ריצה", "שירה", "טניס"];

export default function PopularHobbies({ containerType = "tag" }) {
  if (containerType === "bubble") {
    return (
      <div className={styles.hobbyBubblesContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyBubble key={index} plusMode={false} className={styles.bubble}>
            {hobby}
          </HobbyBubble>
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.hobbyTagsContainer}>
        {hobbies.map((hobby, index) => (
          <HobbyTag hobby={hobby} key={index} />
        ))}
      </div>
    );
  }
}
