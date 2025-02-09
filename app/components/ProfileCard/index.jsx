import Image from "next/image";
import styles from "./style.module.scss";

export default function ProfileCard({ fallen }) {
  return (
    <div className={styles.card}>
      <div className={styles.profileImage}>
        <Image
          className={styles.profileImage}
          src={fallen.imageUrl}
          alt={`${fallen.firstName} ${fallen.lastName}`}
          width={150}
          height={200}
        />
      </div>
      <div>
        <h3
          className={styles.name}
        >{`${fallen.firstName} ${fallen.lastName}`}</h3>
        <p className={styles.years}>
          {fallen.birthYear} - {fallen.deathYear}
        </p>
      </div>
    </div>
  );
}
