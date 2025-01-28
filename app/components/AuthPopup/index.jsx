import React, { useState } from "react";
import styles from "./style.module.scss";
import GenericInput from "../GenericInput/index";
import Button from "../Button";
import GoogleAuth from "./GoogleAuth";

export default function AuthPopup({ onClose }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleFirstNameChange = (e) => setFirstName(e.target.value);
    const handleLastNameChange = (e) => setLastName(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);

    const toggleForm = () => setIsLogin(!isLogin);

    const handleGoogleLoginSuccess = (response) => {
        console.log("Logged in with Google:", response);
    };

    const handleGoogleLoginFailure = (error) => {
        console.error("Google login failed:", error);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <button className={styles.closeButton} onClick={onClose}>
                    ✖
                </button>
                <h2 className={styles.title}>{isLogin ? "התחברות" : "הרשמה"}</h2>
                <form className={styles.form}>
                    {!isLogin && (
                        <>
                            <GenericInput
                                type="text"
                                placeholder="שם פרטי"
                                value={firstName}
                                onChange={handleFirstNameChange}
                            />
                            <GenericInput
                                type="text"
                                placeholder="שם משפחה"
                                value={lastName}
                                onChange={handleLastNameChange}
                            />
                            <GenericInput
                                type="phone"
                                placeholder="טלפון"
                                value={phone}
                                onChange={handlePhoneChange}
                            />
                        </>
                    )}
                    <GenericInput
                        type="email"
                        placeholder="אימייל"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <GenericInput
                        type="password"
                        placeholder="סיסמה"
                        value={password}
                        onChange={handlePasswordChange}
                    />
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
