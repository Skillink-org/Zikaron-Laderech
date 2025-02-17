"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import { useRouter, useSearchParams } from "next/navigation";

export default function HobbyTag({ hobby, className = "", ...props }) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = (params) => {
    return new URLSearchParams(params);
  };

  const getChosenHobby = () => {
    const params = getParams(searchParams);

    return params.get("q");
  };

  const isChosenHobby = () => {
    return getChosenHobby() === hobby;
  };

  const handleClick = () => {
    const params = getParams(searchParams);
    params.set("q", hobby);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {rand ? (
        <DynamicBackground
          rand={rand}
          active={getChosenHobby() ? isChosenHobby() : true}
          className={styles.dynamicBackground}
        >
          <div
            className={`${styles.hobbyTag} ${className}`}
            onClick={handleClick}
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
