import styles from './style.module.scss'
import { footerNavList } from '@/lib/NavigationList'
import NavLink from '@/app/components/NavLink'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <nav className={styles.nav}>
                {footerNavList.map((link, index) => (
                    <NavLink key={index} href={link.href}>{link.label}</NavLink>
                ))}
            </nav>
            <div className={styles.copyright}>2025 | נבנה ופותח ע”י Skillink</div>
        </footer>
    )
}