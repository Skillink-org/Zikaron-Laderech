"use client";

import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";

export default function HobbyTag({
  hobby,
  className = "",
  onClick,
  ...props
}) {
  const rand = useRand();

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
