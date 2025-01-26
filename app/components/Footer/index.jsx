import Link from 'next/link'
import styles from './style.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <Link href='/'>בית</Link>
                <Link href='/all-fallen'>השמות והתחביבים</Link>
                <Link href='/about'>אודות</Link>
                <Link href='/contact'>יצירת קשר</Link>
                <Link href='/'>הוספת נופל</Link>
            </nav>
            <small className={styles.small}>2025 | נבנה ופותח ע”י Skillink</small>
        </footer>
    )
}