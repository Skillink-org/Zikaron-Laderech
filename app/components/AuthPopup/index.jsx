import Image from "next/image";
import Button from "../Button";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { signIn } from "next-auth/react";
import GenericInput from "../GenericInput/index";
import { loginFields, signupFields } from "@/lib/FormFields";

export default function AuthPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await handleEmailSignin();
    }
  };
  const handleEmailSignin = async () => {
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (response?.error) {
      console.error("Email login failed:", response.error);
    } else {
      console.log("Logged in with Email:", response);
      onClose();
    }
  };

  const currentFields = isLogin ? loginFields : signupFields;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2 className={styles.title}>{isLogin ? "התחברות" : "הרשמה"}</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          {currentFields.map(({ type, placeholder, stateKey }) => (
            <GenericInput
              key={stateKey}
              type={type}
              name={type}
              placeholder={placeholder}
              value={formData[stateKey]}
              required={true}
              onChange={handleChange(stateKey)}
            />
          ))}

          <Button type="submit" className={styles.submitButton}>
            {isLogin ? "התחברות" : "הרשמה"}
          </Button>

          <Button
            onClick={() => {
              signIn("google");
            }}
            className={styles.googleButton}
          >
            <Image
              src="/google-icon.svg"
              width={20}
              height={20}
              alt="google icon"
              unoptimized
            />

            <p className={styles.googleText}>כניסה עם גוגל</p>
          </Button>

          <div className={styles.toggleButton} onClick={toggleForm}>
            <small>
              {isLogin
                ? "אין לך חשבון? לחץ כאן להרשמה"
                : "נרשמת בעבר? לחץ כאן להתחברות"}
            </small>
          </div>
        </form>
      </div>
    </div>
  );
}
