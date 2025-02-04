import styles from "./style.module.scss";

const TitleDivider = ({
  title,
  containerClassName = "",
  dividerClassName = "",
}) => {
  return (
    <div className={`${styles.container} ${containerClassName}`}>
      <h3 className={styles.title}>{title}</h3>
      <div className={`${styles.divider} ${dividerClassName}`} />
    </div>
  );
};

export default TitleDivider;
