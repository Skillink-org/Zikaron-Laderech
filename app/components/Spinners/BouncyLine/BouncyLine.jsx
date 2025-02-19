import styles from "./style.module.scss";

const BouncyLine = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerBackground}>
        <div className={styles.bouncingLine}></div>
      </div>
    </div>
  );
};

export default BouncyLine;
