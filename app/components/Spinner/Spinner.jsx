import styles from "./style.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinnerBackground}>
        <div className={styles.bouncingLine}></div>
      </div>
    </div>
  );
};

export default Spinner;
