import styles from './style.module.scss';

const HobbyBubbleSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmerWrapper} />
    </div>
  );
};

export default HobbyBubbleSkeleton; 