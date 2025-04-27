import styles from "./style.module.scss";

const TitleDivider = ({
  title,
  titleClassName = "",
  containerClassName = "",
  dividerClassName = "",
  variant = "withTitle",
}) => {
  const isLineOnly = variant === "line" || !title;
  
  return (
    <div className={`${styles.container} ${isLineOnly ? styles.lineOnly : ""} ${containerClassName}`}>
      {!isLineOnly && (
        <h3 className={`${styles.title} ${titleClassName}`}>{title}</h3>
      )}
      <div className={`${styles.divider} ${dividerClassName}`} />
    </div>
  );
};

export default TitleDivider;