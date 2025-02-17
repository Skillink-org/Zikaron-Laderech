"use client";

import styles from "./style.module.scss";
import GenericInput from "../GenericInput";
import { useDebouncedCallback } from "use-debounce";
import { useRouter, useSearchParams } from "next/navigation";

const SearchInput = ({
  className = "",
  initialValue = "",
  searchTrigger,
  ...props
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams);
    e.target.value ? params.set("q", e.target.value) : params.delete("q");

    searchTrigger === "change"
      ? handleDebouncing(params)
      : handleRouting(params);
  };

  const handleDebouncing = useDebouncedCallback((params) => {
    handleRouting(params);
  }, 300);

  const handleRouting = (params) => {
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <GenericInput
      type="search"
      name="searchQuery"
      defaultValue={initialValue}
      className={`${styles.searchInput} ${className}`}
      placeholder="חיפוש תחביב או שם"
      onChange={handleChange}
      {...props}
    />
  );
};

export default SearchInput;
