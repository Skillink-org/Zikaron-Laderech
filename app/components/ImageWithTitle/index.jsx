import React from "react";
import styles from "./style.module.scss";

const ImageWithTitle = ({ imageUrl, title, subtitle,onClick , style}) => {
  return (
    <div
      className={styles.imageWithTitle}
      style={{
        backgroundImage: `url(${imageUrl})`,
        ...style,
      }}
      onClick={onClick} 
      role={onClick ? "button" : undefined} 
      tabIndex={onClick ? 0 : undefined} 
    >
      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default ImageWithTitle;
