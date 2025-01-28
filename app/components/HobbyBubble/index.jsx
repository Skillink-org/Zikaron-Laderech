"use client";

import Image from "next/image";
import useRand from "@/hooks/useRand";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";

export default function HobbyBubble({
  children = "טניס",
  plusMode = true,
  onClick,
}) {
  const rand = useRand();

  return (
    <>
      {rand ? (
        <DynamicBackground rand={rand}>
          <div className={styles.hobbyBubble} onClick={onClick}>
            {children}
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
        // TODO: Add a loading indicator here
        <></>
      )}
    </>
  );
}
