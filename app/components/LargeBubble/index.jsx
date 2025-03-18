import Button from "../Button";
import styles from "./style.module.scss";

export default function LargeBubble({
  title,
  subtitle,
  buttonText,
  onButtonClick,
}) {
  return (
    <div className={styles.largeBubble}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Button className={styles.button} onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
}
