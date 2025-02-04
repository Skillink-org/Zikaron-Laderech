"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import { useRouter, useSearchParams } from "next/navigation";

export default function HobbyTag({ hobby, className = "", onClick, ...props }) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  onClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("q", hobby);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {rand ? (
        <DynamicBackground rand={rand} className={styles.dynamicBackground}>
          <div
            className={`${styles.hobbyTag} ${className}`}
            onClick={onClick}
            {...props}
          >
            {hobby}
          </div>
        </DynamicBackground>
      ) : (
        // TODO: Add a loading indicator here
        <></>
      )}
    </>
  );
}
