import React from "react";
import HobbyTag from "../HobbyTag";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";
import { connectToDB } from "@/server/connect";
import { getPopularHobbies } from "@/server/service/fallen.service";

export default async function PopularHobbies({ 
  displayMode = "home",
  isClickable = false
}) {
  await connectToDB();
  const hobbies = await getPopularHobbies();

  const bubblesClasses = `${styles.hobbyBubblesContainer} ${
    displayMode === "fallen" ? styles.alwaysHidden : ""
  }`;

  const tagsClasses = `${styles.hobbyTagsContainer} ${
    displayMode === "fallen" ? styles.alwaysVisible : ""
  }`;

  return (
    <>
      <div className={bubblesClasses}>
        {hobbies.map((hobby, index) => (
          <HobbyBubble
            key={index}
            plusMode={false}
            className={styles.bubble}
            title={`${hobby.fallenCount} נופלים`}
            isClickable={isClickable}
          >
            {hobby._id}
          </HobbyBubble>
        ))}
      </div>

      <div className={tagsClasses}>
        {hobbies.map((hobby, index) => (
          <HobbyTag
            hobby={hobby._id}
            key={index}
            title={`${hobby.fallenCount} נופלים`}
            isClickable={isClickable}
          />
        ))}
      </div>
    </>
  );
}