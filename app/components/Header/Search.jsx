'use client'
import styles from './style.module.scss'
import Image from "next/image"
import SearchInput from '../SearchInput'

export default function Search() {
    function toggleSearch() { }
    //TODO toggle Search field on mobile

    return (
        <div className={styles.search}>
            <SearchInput />
            <Image src="/search-icon.svg" className={styles.searchIcon} width={26} height={26} alt="Search icon" onClick={toggleSearch} />
        </div>
    )
}