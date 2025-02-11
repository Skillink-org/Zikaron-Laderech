"use client";

import styles from "./page.module.scss";
import Button from "../components/Button";
import { useRouter, useSearchParams } from "next/navigation";
import SearchInput from "../components/SearchInput";

const SearchForm = ({ query }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasNoParams = new URLSearchParams(searchParams).size === 0;

  return (
    <form
      className={styles.searchContainer}
      onReset={() => router.push(window.location.pathname)}
    >
      <SearchInput className={styles.searchInput} initialValue={query} />
      <Button
        className={styles.searchButton}
        type="reset"
        disabled={hasNoParams}
      >
        איפוס
      </Button>
    </form>
  );
};

export default SearchForm;
