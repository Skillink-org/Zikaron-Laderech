"use client";

import styles from "./style.module.scss";

export default function Button({
  children,
  className = styles.button,
  disabled = false,
  onClick,
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
