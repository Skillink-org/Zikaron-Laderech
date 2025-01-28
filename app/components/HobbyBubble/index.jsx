"use client";
import Image from "next/image";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";

export default function HobbyBubble({
  children = "טניס",
  plusMode = true,
  onClick,
}) {
  return (
    <DynamicBackground>
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
  );
}
