"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import { useRouter, useSearchParams } from "next/navigation";
import HobbyTagSkeleton from '../Skeletons/HobbyTagSkeleton';

export default function HobbyTag({ 
  hobby, 
  className = "", 
  isClickable = true,
  ...props 
}) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  const getParams = () => new URLSearchParams(searchParams);

  const getChosenHobby = () => getParams().get("q");

  const isChosenHobby = () => getChosenHobby() === hobby;

  const handleClick = () => {
    if (!isClickable) return;

    const params = getParams();
    params.delete("page");
    params.set("q", hobby);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  const tagClass = `${styles.hobbyTag} ${className} ${isClickable ? styles.clickable : ''}`;

  return (
    <>
      {rand ? (
        <DynamicBackground
          rand={rand}
          active={getChosenHobby() ? isChosenHobby() : true}
          className={styles.dynamicBackground}
        >
          <div
            className={tagClass}
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