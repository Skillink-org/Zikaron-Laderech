import styles from './style.module.scss'
import MobileNav from './MobileNav'
import Search from './Search'
import NavList from './NavList'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.logo}><span>זיכרון </span>לדרך</div>
            <NavList />
            <MobileNav />
            <Search />
        </header>
    )
}