import styles from './style.module.scss'
import NavLink from '@/app/components/NavLink'
import { headerNavList } from '@/lib/NavigationList'

export default function NavList({ closeNav }) {

    return (
        <div className={styles.nav}>
            {headerNavList.map((link, index) => (
                <NavLink key={index} href={link.href} onClick={closeNav}>{link.label}</NavLink>
            ))}
        </div>
    )
}