"use client";

import Image from "next/image";
import Button from "../Button";
import styles from "./style.module.scss";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import GenericInput from "../GenericInput/index";
import { resetPasswordFields, loginFields, signupFields } from "@/lib/FormFields";
import { createUserAction, resetPasswordAction } from '@/server/actions/user.action';

export default function AuthPopup({ onClose }) {
  const [authState, setAuthState] = useState("signIn");
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
    setAuthState(authState != "signIn" ? "signIn" : "signUp")
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("")

    switch (authState) {
      case "signIn":
        try {
          await handleEmailSignin();
        } catch (error) {
          setErrorMessage(error.message);
        }
        break;
      case "signUp":
        try {
          await handleSignUp();
        } catch (error) {
          setErrorMessage(error.message);
        }
        break;
      case "resetPassword":
        try {
          await handlePasswordReset();
        } catch (error) {
          setErrorMessage(error.message);
        }
        break;
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
        throw new Error("התחברות נכשלה. אמת את הפרטים ונסה שוב.");
      }
    } catch (error) {
      throw new Error("התחברות נכשלה. אמת את הפרטים ונסה שוב.");
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

  const handlePasswordReset = async () => {
    if (!formData.email) {
      setErrorMessage("נא להזין כתובת אימייל.");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await resetPasswordAction(formData.email);
      setSuccessMessage("הקישור נשלח בהצלחה. בדוק את תיבת המייל שלך.")
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
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

  const currentFields = authState == "signIn" ? loginFields : authState == "signUp" ? signupFields : resetPasswordFields;

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2 className={styles.title}>{authState == "signIn" ? "התחברות" : authState == "signUp" ? "הרשמה" : "איפוס סיסמא"}</h2>
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
          <Button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? <div className={styles.loader}></div> :
              (authState == "signIn" ? "התחברות" : authState == "signUp" ? "הרשמה" : "שלח קישור לאיפוס")}
          </Button>

          {authState != "resetPassword" && (
            <Button onClick={() => signIn("google")} className={styles.googleButton}>
              <Image
                src="/google-icon.svg"
                width={18}
                height={18}
                alt="google icon"
                unoptimized />
              <p className={styles.googleText}>כניסה עם גוגל</p>
            </Button>
          )}

          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={styles.successMessage}>{successMessage}</p>}

          <div className={styles.toggleContainer}>
            <small className={styles.toggleButton} onClick={toggleForm}>
              {authState === "signIn" ? (
                <span className={styles.span}>אין לך חשבון? לחץ כאן להרשמה</span>
              ) : authState === "signUp" ? (
                <span className={styles.span}>נרשמת בעבר? לחץ כאן להתחברות</span>
              ) : (
                <span className={styles.span}>חזרה להתחברות</span>
              )}
            </small>
            {authState === "signIn" && (
              <small className={styles.forgotPassword} onClick={() => setAuthState("resetPassword")}>
                שכחתי סיסמא
              </small>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}