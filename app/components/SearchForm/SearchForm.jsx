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
    navigate(`/all-fallen?q=${getFallenFromQuery()}`);
  };

  const handleReset = () => {
    navigate(window.location.pathname);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  const navigate = (url) => {
    if (hasNoParams) return;

    router.push(url, { scroll: false });
  };

  const getFallenFromQuery = () => {
    return new URLSearchParams(searchParams).get("q") || "";
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
          initialValue={query || getFallenFromQuery()}
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
