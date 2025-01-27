import styles from "./style.module.scss";

export default function ProfileCard({
  firstName = "מאי",
  lastName = "הלל",
  birthYear = "2000",
  deathYear = "2023",
  imageSrc = "/profileImage.webp",
}) {
  return (
    <div className={styles.card}>
      <div className={styles.profileImage}>
        <img src={imageSrc} alt={`${firstName} ${lastName}`} />
      </div>
      <h3 className={styles.name}>{`${firstName} ${lastName}`}</h3>
      <p className={styles.years}>
        {birthYear} - {deathYear}
      </p>
    </div>
  );
}
