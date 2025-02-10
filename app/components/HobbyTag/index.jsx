"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import { useRouter, useSearchParams } from "next/navigation";

export default function HobbyTag({ hobby, className = "", onClick, ...props }) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = (params) => {
    return new URLSearchParams(params);
  };

  onClick = () => {
    const params = getParams(searchParams);
    params.set("q", hobby);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const isChosenHobby = () => {
    const params = getParams(searchParams);

    return params.get("q") === hobby;
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
            {isChosenHobby() && <div className={styles.checkContainer}></div>}
          </div>
        </DynamicBackground>
      ) : (
        // TODO: Add a loading indicator here
        <></>
      )}
    </>
  );
}
