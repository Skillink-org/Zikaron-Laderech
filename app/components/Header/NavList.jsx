import styles from './style.module.scss'
import Link from 'next/link'

export default function NavList() {
    return (
        <div className={styles.nav}>
            <Link href='/'>בית</Link>
            <Link href='/all-fallen'>השמות והתחביבים</Link>
            <Link href='/about'>אודות</Link>
            <Link href='/contact'>יצירת קשר</Link>
        </div>
    )
}