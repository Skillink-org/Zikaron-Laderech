import React from "react";
import styles from "./ImageWithTitle.module.scss";

const ImageWithTitle = ({ imageUrl, title, subtitle }) => {
  return (
    <div
      className={styles.imageWithTitle}
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default ImageWithTitle;
