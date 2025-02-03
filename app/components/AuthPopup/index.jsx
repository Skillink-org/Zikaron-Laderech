import React, { useState } from "react";
import styles from "./style.module.scss";
import GenericInput from "../GenericInput/index";
import Button from "../Button";
import { loginFields, signupFields } from "@/lib/FormFields";
import { signIn } from "next-auth/react";
import GoogleIcon from '@mui/icons-material/Google';
import CircularProgress from '@mui/material/CircularProgress';

export default function AuthPopup({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phone: "",
    });

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (key) => (e) => {
        setFormData((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrorMessage("");
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        if (isLogin) {
            await handleEmailSignin();
        }
        else {
            await handleSignUp();
        }
        setLoading(false);
    };

    const handleEmailSignin = async () => {
        const response = await signIn("credentials", {
            redirect: false,
            email: formData.email,
            password: formData.password,
        });

        if (response?.error) {
            setErrorMessage("התחברות נכשלה. בדוק את הפרטים ונסה שוב.");
        } else {
            setTimeout(() => {
                onClose();
            }, 2000);
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

                    <Button
                        type="submit"
                        onClick={handleClick}
                        className={styles.submitButton}
                        disabled={loading}>
                        {loading ? <CircularProgress className={styles.progressCircle} /> : (isLogin ? "התחברות" : "הרשמה")}
                    </Button>

                    <Button
                        onClick={() => signIn("google")}
                        className={styles.googleButton}>
                        <div className={styles.wrapper}>
                            <GoogleIcon />
                            <p className={styles.googleText}>כניסה עם גוגל</p>
                        </div>
                    </Button>

                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

                    <div className={styles.toggleButton} onClick={toggleForm}>
                        <small>{isLogin ? "אין לך חשבון? לחץ כאן להרשמה" : "נרשמת בעבר? לחץ כאן להתחברות"}</small>
                    </div>
                </form>
            </div>
        </div>
    );
}
