"use client";

import Image from "next/image";
import Button from "../Button";
import styles from "./style.module.scss";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import GenericInput from "../GenericInput/index";
import { loginFields, signupFields } from "@/lib/FormFields";
import { createUserAction } from '@/server/actions/user.action';

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
      try {
        await handleEmailSignin();
      } catch (error) {
        setErrorMessage(error.message);
      }
    } else {
      try {
        await handleSignUp();
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    setLoading(false);
  };


  const handleEmailSignin = async () => {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (response && !response.error) {
        setTimeout(() => {
          onClose();
        }, 2000);
        return;
      }
      else {
        throw new Error("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
      }
    } catch (error) {
      throw new Error("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
    }
  };


  const handleSignUp = async () => {
    try {
      const response = await createUserAction(formData);
      if (response?.newUser) {
        setSuccessMessage("ההרשמה הצליחה. נא התחבר למערכת.");
        setErrorMessage("");
        return;
      }
      else {
        throw new Error("שגיאה בהרשמה, נסה שוב.");
      }
    } catch (error) {
      throw new Error("שגיאה בהרשמה, נסה שוב.");
    }
  };


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
          {currentFields.map(({ type, placeholder, stateKey, autoComplete }) => (
            <GenericInput
              key={stateKey}
              type={type}
              name={type}
              placeholder={placeholder}
              value={formData[stateKey]}
              required={true}
              autoComplete={autoComplete}
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
