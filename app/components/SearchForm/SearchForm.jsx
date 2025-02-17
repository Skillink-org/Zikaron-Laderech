"use client";

import Button from "../Button";
import styles from "./style.module.scss";
import SearchInput from "../SearchInput";
import CustomBubble from "../CustomBubble";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = ({ query }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasNoParams = new URLSearchParams(searchParams).size === 0;

  return (
    <CustomBubble className={styles.customBubble}>
      <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
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
    </CustomBubble>
  );
};

export default SearchForm;
