import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';

export default function UserProfile({ firstName, lastName, imageSrc }) {
    const getInitials = (name) => {
        const nameParts = name.split(' ');
        return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    };

    return (
        <div className={styles.userProfile}>
            <span className={styles.userName}>{`${firstName} ${lastName}`}</span>
            {imageSrc ? (
                <Image
                    src={imageSrc}
                    className={styles.profilePicture}
                    width={40}
                    height={40}
                />
            ) : (
                <div className={styles.initials}>
                    {getInitials(firstName)}
                    {getInitials(lastName)}
                </div>
            )}
        </div>
    );
}
