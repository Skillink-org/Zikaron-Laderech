import React from "react";
import styles from "./style.module.scss";

const HobbyTagSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmerWrapper} />
    </div>
  );
};

export default HobbyTagSkeleton;
