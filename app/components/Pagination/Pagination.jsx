"use client";

import Image from "next/image";
import Button from "../Button";
import styles from "./style.module.scss";
import { useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ currentPage, totalPages }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={styles.paginationContainer}>
      <Button
        className={styles.paginationButton}
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        title="הדף הקודם"
      >
        <Image
          className={styles.paginationButtonImage}
          src="/arrowChevronRight.svg"
          width={18}
          height={18}
          alt="right arrow"
          unoptimized
        />
      </Button>

      <div className={styles.paginationTextContainer}>
        <span className={styles.paginationText}>עמוד</span>
        <span> {currentPage} </span>
        <span className={styles.paginationText}>מתוך</span>
        <pre className={styles.paginationSlash}> / </pre>
        <span> {totalPages}</span>
      </div>

      <Button
        className={styles.paginationButton}
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        title="הדף הבא"
      >
        <Image
          className={styles.paginationButtonImage}
          src="/arrowChevronLeft.svg"
          width={18}
          height={18}
          alt="left arrow"
          unoptimized
        />
      </Button>
    </div>
  );
};

export default Pagination;
