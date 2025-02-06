"use client";

import { useState } from "react";
import styles from "./style.module.scss";
import GenericInput from "../GenericInput";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({ className = "", initialValue = "", ...props }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialValue);

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
    <GenericInput
      type="search"
      name="searchQuery"
      className={`${styles.searchInput} ${className}`}
      placeholder="חיפוש תחביב או שם"
      onChange={handleChange}
      {...props}
    />
  );
};

export default SearchInput;
