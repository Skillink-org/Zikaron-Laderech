import Link from 'next/link'
import styles from './style.module.scss'

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
            <input type="text" />
        </header>
    )
}