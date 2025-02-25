"use client";

import Form from "next/form";
import Button from "../Button";
import styles from "./style.module.scss";
import SearchInput from "../SearchInput";
import CustomBubble from "../CustomBubble";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = ({ query, searchTrigger }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasNoParams = searchParams.size === 0;
  const buttonType = searchTrigger === "change" ? "reset" : "submit";
  const buttonText = searchTrigger === "change" ? "איפוס" : "חיפוש";

  const handleReset = () => {
    router.push(window.location.pathname);
  };

  const getFallenFromQuery = () => {
    return searchParams.get("q") || "";
  };

  return (
    <CustomBubble className={styles.customBubble}>
      <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
      <Form
        className={styles.searchContainer}
        onReset={handleReset}
        action={`/all-fallen?q=${getFallenFromQuery()}`}
      >
        <SearchInput
          className={styles.searchInput}
          initialValue={query || getFallenFromQuery()}
          searchTrigger={searchTrigger}
        />
        <Button
          className={styles.searchButton}
          type={buttonType}
          disabled={hasNoParams}
        >
          {buttonText}
        </Button>
      </Form>
    </CustomBubble>
  );
};

export default SearchForm;
