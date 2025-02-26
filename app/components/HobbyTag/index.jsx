"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import { useRouter, useSearchParams } from "next/navigation";
import HobbyTagSkeleton from '../skeletons/HobbyTagSkeleton';

export default function HobbyTag({ hobby, className = "", ...props }) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = () => new URLSearchParams(searchParams);

  const getChosenHobby = () => getParams().get("q");

  const isChosenHobby = () => getChosenHobby() === hobby;

  const handleClick = () => {
    const params = getParams();
    params.delete("page");
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
        <HobbyTagSkeleton />
      )}
    </>
  );
}
