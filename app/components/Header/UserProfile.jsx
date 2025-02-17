import React, { useState, useEffect, useRef } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Button from '../Button';

import { redirect } from "next/navigation";

export default function UserProfile({ firstName, lastName, imageSrc, role }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const profileContainerRef = useRef(null);

    const getInitials = (name) => {
        if (!name) return '';
        const nameParts = name.split(' ');
        return nameParts.map(part => part.charAt(0).toUpperCase()).join('');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                profileContainerRef.current && !profileContainerRef.current.contains(event.target)
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.userProfile}>
            <div
                className={styles.profileContainer}
                onClick={() => setMenuOpen(!menuOpen)}
                ref={profileContainerRef}
            >
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
                <div className={styles.menu} ref={menuRef}>
                    {role === "admin" ?
                        (<>
                            <Button
                                onClick={() => {
                                    setMenuOpen(false);
                                    redirect("/admin");
                                }}
                            >
                                ניהול נופלים
                            </Button>
                            <Button
                                onClick={() => {
                                    setMenuOpen(false);
                                    redirect("/manage-users");
                                }}
                            >
                                ניהול משתמשים
                            </Button>
                        </>)
                        :
                        ("")
                    }

                    <Button
                        onClick={() => signOut()}
                    >
                        התנתק
                    </Button>
                </div>
            )}
        </div>
    );
}
