"use client";
import React from "react";
import styles from "./style.module.scss";
import DynamicBackground from "../DynamicBackground";

export default function HobbyTag({ hobby = "טניס", onClick, ...props }) {
  return (
    <DynamicBackground>
      <div className={styles.hobbyBubble} onClick={onClick} {...props}>
        {hobby}
      </div>
    </DynamicBackground>
  );
}