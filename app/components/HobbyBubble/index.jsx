"use client";

import Image from "next/image";
import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import HobbyBubbleSkeleton from "../Skeletons/HobbyBubbleSkeleton";

export default function HobbyBubble({
  dynamicBackgroundClassName = "",
  className = "",
  children = "טניס",
  plusMode = true,
  onClick,
  ...props
}) {
  const rand = useRand();

  return (
    <>
      {rand ? (
        <DynamicBackground rand={rand} className={dynamicBackgroundClassName}>
          <div
            className={`${styles.hobbyBubble} ${className}`}
            onClick={onClick}
            {...props}
          >
            <span className={styles.title}>{children}</span>
            {plusMode ? (
              <Image
                src="/plusIcon.svg"
                alt="Plus icon"
                className={styles.Image}
                width={20}
                height={20}
              />
            ) : (
              ""
            )}
          </div>
        </DynamicBackground>
      ) : (
        <HobbyBubbleSkeleton />
      )}
    </>
  );
}
