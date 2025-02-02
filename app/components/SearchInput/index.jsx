"use client";

import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({
  className = "",
  width = "100%",
  initialValue = "",
  ...props
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    setQuery(e.target.value);
    handleSearch();
  };

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(searchParams);
    query ? params.set("q", query) : params.delete("q");

    router.push(`?${params.toString()}`, { scroll: false });
  }, 300);

  return (
    <form className={styles.formContainer} onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        name="searchQuery"
        defaultValue={query}
        className={`${styles.searchInput} ${className}`}
        style={{ width }}
        placeholder="חיפוש תחביב או שם"
        onChange={handleChange}
        {...props}
      />
    </form>
  );
};

export default SearchInput;
