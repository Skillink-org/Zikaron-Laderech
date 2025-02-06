"use client";

import styles from "./page.module.scss";
import Button from "../components/Button";
import { useRouter } from "next/navigation";
import SearchInput from "../components/SearchInput";

const SearchForm = ({ query }) => {
  const router = useRouter();

  return (
    <form
      className={styles.searchContainer}
      onReset={() => router.push(window.location.pathname)}
    >
      <SearchInput className={styles.searchInput} initialValue={query} />
      <Button className={styles.searchButton} type="reset">
        איפוס
      </Button>
    </form>
  );
};

export default SearchForm;
