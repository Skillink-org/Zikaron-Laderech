"use client"
import { useState } from 'react'
import styles from './style.module.scss'
import MobileNav from './MobileNav'
import Search from './Search'
import NavList from './NavList'
import AuthButton from './AuthButton'
import UserProfile from './UserProfile'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const exampleUser = {
        firstName: "יוסף",
        lastName: "כהן",
        imageSrc: '/profileImage.webp'
    };
    return (
        <header className={styles.header}>
            <NavList />
            <MobileNav />
            <Search />
            {isLoggedIn ? <UserProfile
                firstName={exampleUser.firstName}
                lastName={exampleUser.lastName}
                imageSrc={exampleUser.imageSrc} />
                : <AuthButton />}
            <div className={styles.logo}><span>זיכרון </span>לדרך</div>
        </header>
    )
}