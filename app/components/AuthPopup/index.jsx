"use client";

import Image from "next/image";
import Button from "../Button";
import styles from "./style.module.scss";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import GenericInput from "../GenericInput/index";
import { loginFields, signupFields } from "@/lib/FormFields";

export default function AuthPopup({ onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (key) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    if (isLogin) {
      await handleEmailSignin();
    } else {
      await handleSignUp();
    };
  };
  const handleEmailSignin = async () => {
    console.log("signin in index")
    const response = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (response?.error) {
      setErrorMessage("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
      setLoading(false);
    } else {
      setTimeout(() => {
        onClose();
      }, 2000);
    };
  }

  const handleSignUp = async () => {
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setSuccessMessage("ההרשמה הצליחה. נא התחבר למערכת.");
      setErrorMessage("");
      setLoading(false);
    } else {
      setErrorMessage("ארעה תקלה. אנא נסה שוב.");
      setSuccessMessage("");
      setLoading(false);
    }
  }

  // Close popup on escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading}>
            {loading ? <div className={styles.loader}></div> : (isLogin ? "התחברות" : "הרשמה")}
          </Button>

          <Button
            onClick={() => {
              signIn("google");
            }}
            className={styles.googleButton}
          >
            <Image
              src="/google-icon.svg"
              width={18}
              height={18}
              alt="google icon"
              unoptimized
            />

            <p className={styles.googleText}>כניסה עם גוגל</p>
          </Button>

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

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
