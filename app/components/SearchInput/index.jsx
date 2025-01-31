"use client";

import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { queryFallen } from "@/server/actions/fallen.action";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);
    query ? params.set("q", query) : params.delete("q");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // TODO: use form action
  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <input
        type="search"
        name="searchQuery"
        value={query}
        className={`${styles.searchInput} ${className}`}
        style={{ width }}
        placeholder="חיפוש תחביב או שם"
        onChange={(e) => setQuery(e.target.value)}
        {...props}
      />
    </form>
  );
};

export default SearchInput;
