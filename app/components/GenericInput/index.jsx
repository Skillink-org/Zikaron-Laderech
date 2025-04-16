import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

export default function GenericInput({
  type,
  placeholder,
  value,
  onChange,
  className = "",
  autoComplete = "on",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordType = type === "password";

  return (
    <div className={`${styles.inputContainer} ${className}`}>
      <input
        type={isPasswordType && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        autoComplete={autoComplete}
        {...props}
      />
      {isPasswordType && (
        <button
          type="button"
          className={styles.eyeIcon}
          onClick={togglePasswordVisibility}
        >
          <Image
            src={showPassword ? "/eye.svg" : "/eye-off.svg"}
            alt={showPassword ? "Hide password" : "Show password"}
            width={20}
            height={20}
            className={styles.img}
          />
        </button>
      )}
    </div>
  );
}
