"use client"
import { useSession } from 'next-auth/react'
import styles from './style.module.scss'
import MobileNav from './MobileNav'
import Search from './Search'
import NavList from './NavList'
import AuthButton from './AuthButton'
import UserProfile from './UserProfile'

export default function Header() {
    const { data: session } = useSession();

    const isLoggedIn = session ? true : false;

    return (
        <header className={styles.header}>
            <MobileNav />
            <div className={styles.logo}><span>זיכרון </span>לדרך</div>
            <NavList />
            {/* <Search /> */}
            {isLoggedIn ? <UserProfile
                firstName={session?.user?.firstName}
                lastName={session?.user?.lastName}
                imageSrc={session?.user?.image}
                role={session?.user?.role} />
                : <AuthButton />}
        </header>
    )
}