import React from "react";
import HobbyTag from "../HobbyTag";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";
import { connectToDB } from "@/server/connect";
import { getPopularHobbies } from "@/server/service/fallen.service";

export default async function PopularHobbies({ containerType = "tag" }) {
  await connectToDB();
  const hobbies = await getPopularHobbies();

  const tagsClasses = `${styles.hobbyTagsContainer} ${
    containerType === "tag" ? styles.showTagsDesktop : ""
  }`;
  
  const bubblesClasses = `${styles.hobbyBubblesContainer} ${
    containerType === "tag" ? styles.hideBubblesDesktop : ""
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
          />
        ))}
      </div>
    </>
  );
}