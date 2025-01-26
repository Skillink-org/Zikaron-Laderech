import React from "react";
import styles from "./profile-card.module.scss";
import Image from 'next/image';

const ProfileCard = ({ firstName, lastName, birthYear, deathYear, imageSrc }) => {
    return (
        <div className={styles.card}>
            <div className={styles.profileImage}>
                <Image
                    src={imageSrc}
                    alt={firstName + " " + lastName}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <h3 className={styles.name}>{firstName + " " + lastName}</h3>
            <p className={styles.years}>
                {birthYear} - {deathYear}
            </p>
        </div>
    );
};

export default ProfileCard;
