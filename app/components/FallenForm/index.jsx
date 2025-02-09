"use client";

import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Image from "next/image"

import StatusMessage from "../StatusMessage";

export default function FallenForm
    ({ isOpen, contentLabel, profile = {}, onSave, onCancel }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [deathDate, setDeathDate] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [about, setAbout] = useState("");
    const [familyWords, setFamilyWords] = useState("");
    const [quote, setQuote] = useState("");
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };

    useEffect(() => {
        if (profile) {
            setFirstName(profile.firstName || "");
            setLastName(profile.lastName || "");
            setBirthDate(formatDate(profile.birthDate));
            setDeathDate(formatDate(profile.deathDate));
            setAbout(profile.about || "");
            setFamilyWords(profile.familyWords || "");
            setQuote(profile.quote || "");
            setImageUrl(profile.imageUrl || "");
            setEmail(profile.email || "");
            setPhone(profile.phone || "");

            if (Array.isArray(profile.hobbies)) {
                setHobbies(profile.hobbies.map(hobby => hobby.name).join(", "));
            }
        }
    }, [profile]);


    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const validateForm = () => {
        if (!firstName) {
            setStatusMessage("נא להזין שם פרטי");
            setStatusType("error");
            return false;
        }

        if (!lastName) {
            setStatusMessage("נא להזין שם משפחה");
            setStatusType("error");
            return false;
        }

        if (!birthDate) {
            setStatusMessage("נא להזין תאריך לידה");
            setStatusType("error");
            return false;
        }

        if (!deathDate) {
            setStatusMessage("נא להזין תאריך פטירה");
            setStatusType("error");
            return false;
        }

        if (!hobbies.trim()) {
            setStatusMessage("נא להזין לפחות תחביב אחד");
            setStatusType("error");
            return false;
        }

        if (!quote.trim()) {
            setStatusMessage("נא להזין ציטוט של הנופל");
            setStatusType("error");
            return false;
        }

        if (!about.trim()) {
            setStatusMessage("נא להזין מידע אודות הנופל");
            setStatusType("error");
            return false;
        }

        if (!familyWords.trim()) {
            setStatusMessage("נא להזין מסר מהמשפחה");
            setStatusType("error");
            return false;
        }

        if (!image && !imageUrl) {
            setStatusMessage("נא להעלות תמונה");
            setStatusType("error");
            return false;
        }

        if (!familyWords.trim()) {
            setStatusMessage("נא להזין כתובת דוא''ל ליצירת קשר");
            setStatusType("error");
            return false;
        }

        if (!/^[a-zA-Zא-ת\s]*$/.test(firstName)) {
            setStatusMessage('נא להזין שם פרטי תקני');
            setStatusType('error');
            return false;
        };

        if (!/^[a-zA-Zא-ת\s]*$/.test(lastName)) {
            setStatusMessage('נא להזין שם משפחה תקני');
            setStatusType('error');
            return false;
        };

        const birth = new Date(birthDate);
        const death = new Date(deathDate);
        const today = new Date();

        if (birth >= today || death <= birth) {
            setStatusMessage("נא להזין תאריך לידה תקין");
            setStatusType("error");
            return false;
        }

        if (death > today) {
            setStatusMessage("נא להזין תאריך פטירה תקין");
            setStatusType("error");
            return false;
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            setStatusMessage('נא להזין כתובת דוא"ל תקנית');
            setStatusType('error');
            return false;
        };

        return true;
    };

    const handleImageUpload = (e) => {
        // TODO: Implement image upload functionality to Cloudinary service
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setStatusMessage('נא להעלות קובץ תמונה בלבד');
                setStatusType('error');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                setStatusMessage('התמונה גדולה מדי. נא להעלות תמונה עד 5MB');
                setStatusType('error');
                return;
            }

            setImage(file);
        }
    };

    const handleSubmit = async () => {

        const hobbiesArray = hobbies.split(",").map(hobbyName => {
            hobbyName = hobbyName.trim();

            const existingHobby = (Array.isArray(profile.hobbies) ? profile.hobbies : []).find(h => h.name === hobbyName);

            return {
                name: hobbyName,
                continueCount: existingHobby ? existingHobby.continueCount : 0
            };
        });

        const profileData = {
            _id: profile._id,
            firstName,
            lastName,
            birthDate,
            deathDate,
            hobbies: hobbiesArray,
            about,
            familyWords,
            quote,
            imageUrl,
            email,
            phone
        };

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("data", JSON.stringify(profileData));

        if (image) {
            formData.append("image", image);
        }

        onSave(formData);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCancel}
            contentLabel={contentLabel}
            className={styles.modalEditFallen}
            overlayClassName={styles.modalOverlay}
            ariaHideApp={false}
        >
            <button className={styles.closeButtonEditFallenModal} onClick={onCancel}>
                <Image
                    src="/closeIcon.svg"
                    alt="Close icon"
                    width={20}
                    height={20}
                />
            </button>

            <form className={styles.profileForm}>

                <h2>{Object.keys(profile).length > 0 ? 'עריכת נופל' : 'הוספת נופל'}</h2>

                <div className={styles.topSection}>
                    <div className={styles.imageContainer}>
                        {profile.imageUrl ? (
                            <Image
                                className={styles.imagePreview}
                                src={profile.imageUrl}
                                alt={`${firstName} ${lastName} image`}
                                width={200}
                                height={200}
                            />
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

                <br />

                <div className={styles.oneLine}>
                    <div className={styles.nameInputs}>
                        <label>
                            שם פרטי:
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required />
                        </label>

                        <label>
                            שם משפחה:
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required />
                        </label>
                    </div>

                    <div className={styles.dateInputs}>
                        <label>
                            תאריך לידה:
                            <input
                                type="date"
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                required />
                        </label>

                        <label>
                            תאריך פטירה:
                            <input
                                type="date"
                                value={deathDate}
                                onChange={(e) => setDeathDate(e.target.value)}
                                required />
                        </label>
                    </div>
                </div>

                <br />

                <label className={styles.fullWidthLabel}>
                    תחביבים: (מופרדים באמצעות פסיק)
                    <textarea
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    ציטוט:
                    <input
                        type="text"
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    אודות:
                    <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    דבר המשפחה:
                    <textarea
                        value={familyWords}
                        onChange={(e) => setFamilyWords(e.target.value)}
                        required />
                </label>

                <br />

                <h3>פרטי יצירת קשר</h3>
                <div className={styles.oneLine}>
                    <div className={styles.contactInputs}>
                        <label>
                            כתובת דוא"ל:
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </label>
                        <label>
                            פלאפון:
                            <input
                                type="number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </label>
                    </div>
                </div>

                <br />

                <div className={styles.formButtons}>
                    <button type="button" onClick={handleSubmit}>שמור שינויים</button>
                    <button type="button" onClick={handleCancel}>ביטול</button>
                </div>

                {statusMessage && (
                    <div className={styles.statusMessage}>
                        <StatusMessage message={statusMessage} type={statusType} />
                    </div>
                )}
            </form >
        </Modal>

    );
}