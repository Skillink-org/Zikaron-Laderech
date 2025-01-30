'use client'

import styles from './style.module.scss'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export default function NavLink({ href, children, ...rest }) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link href={href} {...rest} className={`${styles.link} ${isActive ? `${styles.active}` : ''}`}>
            {children}
        </Link>
    )
}

