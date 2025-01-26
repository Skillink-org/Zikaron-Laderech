'use client'

import Image from 'next/image'
import styles from './style.module.scss'
import { useState } from 'react'
import Link from 'next/link'

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(true)

    function toggleNav() {
        setIsOpen(!isOpen)
    }

    return (
        <div className={`${styles.mobileNav} ${isOpen ? styles.open : styles.closed}`}>
            <Image
                src="/mobile-nav-icon.svg"
                className={styles.navIcon}
                width={24}
                height={24}
                alt="Mobile nav icon"
                onClick={toggleNav} />

            <nav className={styles.nav}>
                <Link href='/'>בית</Link>
                <Link href='/all-fallen'>השמות והתחביבים</Link>
                <Link href='/about'>אודות</Link>
                <Link href='/contact'>יצירת קשר</Link>
            </nav>
        </div>
    )
}