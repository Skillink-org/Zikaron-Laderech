"use client";

import { React, useState, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from './page.module.scss'
import GenericInput from "@/app/components/GenericInput";
import Button from "@/app/components/Button";
import { isValidTokenAction, updateUserPasswordAction } from '@/server/actions/user.action';

export default function ResetPasswordPage() {
    const params = useParams();
    const token = params.token;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkTokenValidity = async () => {
            const response = await isValidTokenAction(token);
            console.log(response)
            if (!response.isValid) {
                setErrorMessage("פג תוקף הקישור, אנא בקש קישור חדש");
                setIsTokenValid(false);
            } else {
                setIsTokenValid(true);
                setUserId(response.userId);
            }
            setLoading(false);
        };
        checkTokenValidity();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);
        if (password !== confirmPassword) {
            setErrorMessage("הסיסמאות אינן תואמות");
            return;
        }
        if (!userId) {
            setErrorMessage("שגיאה בזיהוי המשתמש");
            return;
        }
        const updateUser = await updateUserPasswordAction(userId, password);
        if (updateUser) {
            setSuccessMessage("הסיסמא שונתה בהצלחה");
        } else {
            setErrorMessage(updateUser.message || "שגיאה באיפוס הסיסמה.");
        }
        setLoading(false);
    };

    return (<>
        {!isTokenValid && !loading && (<div className={styles.expiredTokenMessage}>{errorMessage}</div>)}

        {isTokenValid && (<div className={styles.resetContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2 className={styles.title}>איפוס סיסמה</h2>
                <GenericInput
                    type="password"
                    placeholder="בחר סיסמא חדשה"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={true}
                />
                <GenericInput
                    type="password"
                    placeholder="אמת את הסיסמא"
                    autoComplete="current-password"
                    name="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                />
                <Button type="submit" className={styles.resetButton}>
                    {loading ? <div className={styles.loader}></div> :
                        "איפוס סיסמא"
                    }
                </Button>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
            </form>
        </div>
        )}
    </>
    );
}