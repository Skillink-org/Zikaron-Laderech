import Link from 'next/link'
import styles from './style.module.scss'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                <Link href='/'>בית</Link>
                <Link href='/'>השמות והתחביבים</Link>
                <Link href='/'>אודות</Link>
                <Link href='/'>יצירת קשר</Link>
                <Link href='/'>הוספת נופל</Link>
            </nav>
            <small className={styles.small}>2025 | נבנה ופותח ע”י Skillink</small>
        </footer>
    )
}