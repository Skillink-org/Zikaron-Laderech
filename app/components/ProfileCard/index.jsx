import Image from "next/image";
import styles from "./style.module.scss";
import { extractYearFromLongDate } from "@/lib/dateFormatter";

export default function ProfileCard({ fallen }) {
  return (
    <div className={styles.card}>
      <Image
        className={styles.profileImage}
        src={fallen.imageUrl}
        alt={`${fallen.firstName} ${fallen.lastName}`}
        width={150}
        height={200}
      />
      <div>
        <h3
          className={styles.name}
        >{`${fallen.firstName} ${fallen.lastName}`}</h3>
        <p className={styles.years}>
          {extractYearFromLongDate(fallen.birthDate)} -{" "}
          {extractYearFromLongDate(fallen.deathDate)}
        </p>
      </div>
    </div>
  );
}
