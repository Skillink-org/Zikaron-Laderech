'use client'
import styles from './style.module.scss'
import Image from "next/image"

export default function Search() {
    function handleSearch() { }

    return (
        <div className={styles.search}>
            <input type="text" className={styles.searchInput} placeholder="חיפוש" name='search' />
            <Image src="/search-icon.svg" className={styles.searchIcon} width={26} height={26} alt="Search icon" onClick={handleSearch} />
        </div>
    )
}