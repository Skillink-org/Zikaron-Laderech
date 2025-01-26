import Link from 'next/link'
import Image from 'next/image'
import styles from './style.module.scss'
import NavIcon from '@/public/mobile-nav-icon.svg'
import MobileNav from './MobileNav'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}><span>זיכרון </span>לדרך</div>
            <nav className={styles.nav}>
                <Link href='/'>בית</Link>
                <Link href='/all-fallen'>השמות והתחביבים</Link>
                <Link href='/about'>אודות</Link>
                <Link href='/contact'>יצירת קשר</Link>
            </nav>
            <MobileNav />

            <div className={styles.search}>
                <input type="text" />
            </div>

        </header>
    )
}