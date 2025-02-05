import React, { useState } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Button from '../Button';

export default function UserProfile({ firstName, lastName, imageSrc }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    };

    return (
        <div className={styles.userProfile}>
            <div className={styles.profileContainer} onClick={() => setMenuOpen(!menuOpen)}>
                {imageSrc ? (
                    <Image
                        className={styles.profilePicture}
                        alt={`${firstName} ${lastName}`}
                        src={imageSrc}
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

            {menuOpen && (
                <div className={styles.menu}>
                    <Button onClick={() => signOut()}>
                        התנתק
                    </Button>
                </div>
            )}
        </div>
    );
}
