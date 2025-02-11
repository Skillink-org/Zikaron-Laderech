"use client";

import { React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from './page.module.scss'
import GenericInput from "@/app/components/GenericInput";
import Button from "@/app/components/Button";

export default function ResetPasswordPage({ params }) {
    const router = useRouter();
    const token = router.quary;
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        // fetch(`/api/reset-password?token=${token}`)
        //     .then(res => res.json())
        //     .then(data => {
        //         if (!data.valid) setError("פג תוקף הקישור, אנא בקש קישור חדש.");
        //     })
        //     .catch(() => setError("שגיאה בבדיקת הקישור."));
    }, [token]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("הסיסמאות אינן תואמות.");
            return;
        }

        const res = await fetch("/api/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
        });

        const data = await res.json();
        if (data.success) {
            setSuccess(true);
            setTimeout(() => router.push("/login"), 3000);
        } else {
            setError(data.message || "שגיאה באיפוס הסיסמה.");
        }
    };

    return (
        <div className={styles.resetContainer}>
            <h2>איפוס סיסמה</h2>
            {error && <p className={styles.error}>{error}</p>}
            {success ? (
                <p className={styles.success}>הסיסמה אופסה בהצלחה! מועבר לדף התחברות...</p>
            ) : (
                <form onSubmit={handleSubmit}>
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
                    {/* <button type="submit">אפס סיסמה</button> */}
                    <Button type="submit">
                        איפוס סיסמא
                    </Button>
                </form>
            )}
        </div>
    );
}