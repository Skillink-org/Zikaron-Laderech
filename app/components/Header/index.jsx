"use client"
import { useSession } from 'next-auth/react'
import styles from './style.module.scss'
import MobileNav from './MobileNav'
import NavList from './NavList'
import AuthButton from './AuthButton'
import UserProfile from './UserProfile'
import Link from 'next/link'

export default function Header() {
    const { data: session } = useSession();

    const isLoggedIn = session ? true : false;

    return (
        <header className={styles.header}>
            <MobileNav />
            <Link href="/" className={styles.logoLink}>
                <div className={styles.logo}><span>זיכרון </span>לדרך</div>
            </Link>
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