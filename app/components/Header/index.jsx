"use client"
import { useState } from 'react'
import styles from './style.module.scss'
import MobileNav from './MobileNav'
import Search from './Search'
import NavList from './NavList'
import AuthButton from './AuthButton'
import UserProfile from './UserProfile'

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(true); // לדוגמה, מציין אם המשתמש מחובר או לא
    const user = { firstName: "Yosef", lastName: "Coen", imageSrc: '' };
    return (
        <header className={styles.header}>
            <div className={styles.logo}><span>זיכרון </span>לדרך</div>
            <NavList />
            <MobileNav />
            <Search />
            {isLoggedIn ? <UserProfile firstName={user.firstName} lastName={user.lastName} imageSrc={user.imageSrc} /> : <AuthButton />}
        </header>
    )
}