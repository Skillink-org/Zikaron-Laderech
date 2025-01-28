"use client";

import { useState } from "react";
import styles from "./style.module.scss";

const SearchInput = ({ className, ...props }) => {
    const [searchQuery, setSearchQuery] = useState('');

    function handleChange(e) {
        setSearchQuery(e.target.value);
    }

    function handleKeydown(e) {
        if (e.key === 'Enter') {
            console.log(e.target.value);
            setSearchQuery('');
            // TODO: Send search query to the server
            // TODO: Implement the server side search logic
            // TODO: Display received list on page
        }
    }

    return (
        <input
            type="search"
            value={searchQuery}
            className={`${styles.searchInput} ${className}`}
            placeholder="חיפוש תחביב או שם"
            onChange={handleChange}
            onKeyDown={handleKeydown}
            {...props}
        />
    );
}

export default SearchInput;
