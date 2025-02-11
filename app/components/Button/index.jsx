"use client";

import styles from "./style.module.scss";

export default function Button({
  children,
  className = "",
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
