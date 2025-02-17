"use client";

import Button from "../Button";
import styles from "./style.module.scss";
import SearchInput from "../SearchInput";
import CustomBubble from "../CustomBubble";
import { useRouter, useSearchParams } from "next/navigation";

const SearchForm = ({ query, searchTrigger }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hasNoParams = new URLSearchParams(searchParams).size === 0;
  const buttonType = searchTrigger === "change" ? "reset" : "button";
  const buttonText = searchTrigger === "change" ? "איפוס" : "חיפוש";

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    const fallen = params.get("q");

    router.push(`/all-fallen?q=${fallen.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    router.push(window.location.pathname);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <CustomBubble className={styles.customBubble}>
      <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
      <form
        className={styles.searchContainer}
        onReset={handleReset}
        onKeyDown={handleKeyDown}
      >
        <SearchInput
          className={styles.searchInput}
          initialValue={query}
          searchTrigger={searchTrigger}
        />
        <Button
          className={styles.searchButton}
          type={buttonType}
          onClick={handleClick}
          disabled={hasNoParams}
        >
          {buttonText}
        </Button>
      </form>
    </CustomBubble>
  );
};

export default SearchForm;
