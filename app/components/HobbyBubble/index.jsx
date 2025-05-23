"use client";

import Image from "next/image";
import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";
import HobbyBubbleSkeleton from "../Skeletons/HobbyBubbleSkeleton";
import { useRouter, useSearchParams } from "next/navigation";

export default function HobbyBubble({
  dynamicBackgroundClassName = "",
  className = "",
  children = "טניס",
  plusMode = true,
  onClick,
  isClickable = true, // Whether the bubble can be clicked
  ...props
}) {
  const rand = useRand();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Click function
  const handleClick = () => {
    if (!isClickable) return; // If not clickable, do nothing
    
    if (onClick) {
      // If there's an external onClick function, use it
      onClick();
    } else {
      // Create new parameters object
      const params = new URLSearchParams();
      
      // Important point: we define the hobby as parameter q
      // This will replace the name that was in the search box with the hobby
      params.set("q", children);
      
      // Preserve other parameters not related to search
      const currentParams = new URLSearchParams(searchParams);
      if (currentParams.has("sort")) {
        params.set("sort", currentParams.get("sort"));
      }

      router.push(`/fallen?${params.toString()}`, { scroll: false });
    }
  };

  // Add class to indicate if clickable or not
  const bubbleClass = `${styles.hobbyBubble} ${className} ${isClickable ? styles.clickable : ''}`;

  return (
    <>
      {rand ? (
        <DynamicBackground rand={rand} className={dynamicBackgroundClassName}>
          <div
            className={bubbleClass}
            onClick={handleClick}
            {...props}
          >
            <div className={styles.title}>{children}</div>
            {plusMode && (
              <div className={styles.plusWrapper}>
                <Image
                  src="/plusIcon.svg"
                  alt="Plus icon"
                  className={styles.Image}
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>
        </DynamicBackground>
      ) : (
        <HobbyBubbleSkeleton />
      )}
    </>
  );
}