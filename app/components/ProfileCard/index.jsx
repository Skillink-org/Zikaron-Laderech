import styles from "./style.module.scss";
import Image from "next/image";

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
                <Image
                    className={styles.profileImage}
                    src={imageSrc}
                    alt={`${firstName} ${lastName}`}
                    width={150}
                    height={200}
                />
            </div>
            <h3 className={styles.name}>{`${firstName} ${lastName}`}</h3>
            <p className={styles.years}>
                {birthYear} - {deathYear}
            </p>
        </div>
    );
}
