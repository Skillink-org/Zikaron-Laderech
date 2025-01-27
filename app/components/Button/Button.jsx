"use client";

import styles from "./style.module.scss";

export default function Button({
  type = "button",
  children,
  disabled = false,
  onClick,
}) {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
