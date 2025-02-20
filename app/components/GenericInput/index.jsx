import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.scss";

export default function GenericInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange  = () => {},
  className = "",
  autoComplete = "on",
  required = false,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPasswordType = type === "password";

  return (
    <div className={styles.inputContainer}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
       id={name}
        type={isPasswordType && showPassword ? "text" : type}
        name={name} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={styles.input}
        autoComplete={autoComplete}
        required={required}
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
