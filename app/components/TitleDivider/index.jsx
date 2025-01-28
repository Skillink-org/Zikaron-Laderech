import styles from './style.module.scss';

const TitleDivider = ({ title }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.divider} />
    </div>
  );
};

export default TitleDivider;