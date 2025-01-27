import styles from "./ImageWithTitle.module.scss";

export default function ImageWithTitle({ imageUrl, title, subtitle }) {
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
}
