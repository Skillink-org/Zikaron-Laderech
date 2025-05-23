"use client";
import styles from "../PopularHobbiesSkeleton/style.module.scss";
import HobbyBubbleSkeleton from "../HobbyBubbleSkeleton";
import HobbyTagSkeleton from "../HobbyTagSkeleton";

export default function PopularHobbiesSkeleton({ containerType = "tag" }) {
  // Create array with 6 dummy items
  const skeletonItems = Array(6).fill(null);

  if (containerType === "bubble") {
    return (
      <div className={styles.hobbyBubblesContainer}>
        {skeletonItems.map((_, index) => (
          <HobbyBubbleSkeleton key={index} className={styles.bubble} />
        ))}
      </div>
    );
  } else {
    return (
      <div className={styles.hobbyTagsContainer}>
        {skeletonItems.map((_, index) => (
          <HobbyTagSkeleton key={index} />
        ))}
      </div>
    );
  }
}