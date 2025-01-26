"use client";

import styles from "./style.module.scss";

const Button = ({ type = "button", value, disabled, onClick }) => {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
      onClick={() => onClick}
    >
      {value}
    </button>
  );
};

export default Button;
