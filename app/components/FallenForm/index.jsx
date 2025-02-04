"use client";

import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";

export default function FallenForm
    ({ profile = {}, onSave, onCancel }) {

    const [fullName, setFullName] = useState(profile.fullName || "");
    const [birthDate, setBirthDate] = useState(profile.birthDate || "");
    const [deathDate, setDeathDate] = useState(profile.deathDate || "");
    const [hobbies, setHobbies] = useState(profile.hobbies || []);
    const [about, setAbout] = useState(profile.about || "");
    const [familyWords, setFamilyWords] = useState(profile.familyWords || "");
    const [quote, setQuote] = useState(profile.quote || "");
    const [imageUrl, setImageUrl] = useState(profile.imageUrl || "");

    useEffect(() => {
        if (Array.isArray(profile.hobbies)) {
            setHobbies(profile.hobbies.join(", "));
        }
    }, [profile]);

    const handleImageUpload = (e) => {
        // TODO: Implement image upload functionality to Cloudinary service
    };

    const handleSubmit = () => {
        const profileData = {
            fullName,
            birthDate,
            deathDate,
            hobbies: hobbies.split(',').map(hobby => hobby.trim()),
            about,
            familyWords,
            quote,
            imageUrl
        };

        onSave(profileData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <form className={styles.profileForm}>

            <h2>{Object.keys(profile).length > 0 ? 'עריכת נופל' : 'הוספת נופל'}</h2>


            <div className={styles.topSection}>
                <div className={styles.rightSide}>
                    <div className={styles.imageContainer}>
                        {imageUrl ? (
                            <img src={imageUrl} alt="Fallen Image" className={styles.imagePreview} />
                        ) : (
                            <div className={styles.imagePlaceholder}></div>
                        )}
                    </div>
                    <label className={styles.fileLabel}>
                        <input
                            type="file"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <div className={styles.leftSide}>
                    <label>
                        שם מלא:
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </label>

                    <div className={styles.dateInputs}>
                        <label className={styles.dateLabel}>
                            תאריך לידה:
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                            />
                        </label>

                        <label className={styles.dateLabel}>
                            תאריך פטירה:
                            <input
                                type="date"
                                value={deathDate}
                                onChange={(e) => setDeathDate(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </div>

            <label className={styles.fullWidthLabel}>
                תחביבים: (מופרדים באמצעות פסיק)
                <textarea
                    value={hobbies}
                    onChange={(e) => setHobbies(e.target.value)}
                />
            </label>

            <label className={styles.fullWidthLabel}>
                ציטוט:
                <input
                    type="text"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                />
            </label>

            <label className={styles.fullWidthLabel}>
                אודות:
                <textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                />
            </label>

            <label className={styles.fullWidthLabel}>
                דבר המשפחה:
                <textarea
                    value={familyWords}
                    onChange={(e) => setFamilyWords(e.target.value)}
                />
            </label>



            <div className={styles.formButtons}>
                <button type="button" onClick={handleSubmit}>שמור שינויים</button>
                <button type="button" onClick={handleCancel}>ביטול</button>
            </div>
        </form >
    );
}