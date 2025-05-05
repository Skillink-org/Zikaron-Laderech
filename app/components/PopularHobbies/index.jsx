import React from "react";
import styles from "./style.module.scss";
import HobbyBubble from "../HobbyBubble";
import { connectToDB } from "@/server/connect";
import { getPopularHobbies } from "@/server/service/fallen.service";
import HobbyTag from "../HobbyTag";
import MobileFilterDropdown from "../MobileFilterDropdown/Index";

export default async function PopularHobbies({ 
  displayMode = "home",
  isClickable = false,
  limit = 10
}) {
  await connectToDB();
  const hobbies = await getPopularHobbies(limit);

  const bubblesClasses = `${styles.hobbyBubblesContainer} ${
    displayMode === "fallen" ? styles.alwaysHidden : ""
  }`;

  const tagsClasses = `${styles.hobbyTagsContainer} ${
    displayMode === "fallen" ? styles.desktopOnly : ""
  }`;

  // visible only on mobile fallen page
  const isFallenPage = displayMode === "fallen";

  return (
    <>
      {/* bubbles on regular page */}
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

      {/* {mobile menu only visible on fallen page} */}
      {isFallenPage && (
        <MobileFilterDropdown hobbies={hobbies} isClickable={isClickable} />
      )}

      {/* tags - if it is a fallen page, or if it's not a fallen page */}
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