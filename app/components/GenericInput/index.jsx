import React from "react";
import styles from './style.module.scss'

export default function GenericInput({ type, placeholder, value, onChange, className=styles.input }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
    />
  );
}
