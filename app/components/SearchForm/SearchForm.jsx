"use client";

import Button from "../Button";
import { useState } from "react";
import styles from "./style.module.scss";
import SearchInput from "../SearchInput";
import CustomBubble from "../CustomBubble";
import { useRouter, useSearchParams } from "next/navigation";
import SpinningCircle from "../Spinners/SpinningCircle/SpinningCircle";

const SearchForm = ({ query, searchTrigger }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [buttonText, setButtonText] = useState(
    searchTrigger === "change" ? "איפוס" : "חיפוש"
  );

  const hasNoParams = new URLSearchParams(searchParams).size === 0;
  const buttonType = searchTrigger === "change" ? "reset" : "button";

  const handleClick = () => {
    navigate(`/all-fallen?q=${getFallenFromQuery()}`);
  };

  const handleReset = () => {
    navigate(window.location.pathname);
  };

  // TODO 2 - form default
  // if not 1 then use button submit and onSubmit instead of catch Enter
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };

  const navigate = (url) => {
    if (hasNoParams) return;

    buttonText === "חיפוש" && setButtonText(<SpinningCircle />);

    router.push(url, { scroll: false });
  };

  const getFallenFromQuery = () => {
    return new URLSearchParams(searchParams).get("q") || "";
  };

  return (
    <CustomBubble className={styles.customBubble}>
      <p className={styles.header}>מצאו נופל לפי שם או תחביב</p>
      {/* 1 Form action=/ */}
      {/* condsider using this: https://nextjs.org/docs/app/api-reference/components/form */}

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
