import React, { useState } from "react";
import styles from "./style.module.scss";
import GenericInput from "../GenericInput/index";
import Button from "../Button";
import GoogleAuth from "./GoogleAuth";
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

    const toggleForm = () => setIsLogin(!isLogin);

    const handleGoogleLoginSuccess = (response) => {
        console.log("Logged in with Google:", response);
    };

    const handleGoogleLoginFailure = (error) => {
        console.error("Google login failed:", error);
    };

    const currentFields = isLogin ? loginFields : signupFields;

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✖
                </button>
                <h2 className={styles.title}>{isLogin ? "התחברות" : "הרשמה"}</h2>
                <form className={styles.form}>
                    {currentFields.map(({ type, placeholder, stateKey }) => (
                        <GenericInput
                            key={stateKey}
                            type={type}
                            placeholder={placeholder}
                            value={formData[stateKey]}
                            onChange={handleChange(stateKey)}
                        />
                    ))}

                    <Button className={styles.submitButton}>
                        {isLogin ? "התחברות" : "הרשמה"}
                    </Button>

                    <GoogleAuth
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        className={styles.googleLoginWrapper}
                    />

                    <div className={styles.toggleButton} onClick={toggleForm}>
                        <small>{isLogin ? "אין לך חשבון? לחץ כאן להרשמה" : "נרשמת בעבר? לחץ כאן להתחברות"}</small>
                    </div>
                </form>
            </div>
        </div>
    );
}
