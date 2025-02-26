import styles from "./style.module.scss";

const ProfileCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonName}></div>
      <div className={styles.skeletonYears}></div>
    </div>
  );
};

export default ProfileCardSkeleton;
