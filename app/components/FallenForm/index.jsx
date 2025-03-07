"use client";

import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";

import Modal from "react-modal";
import Image from "next/image"

import StatusMessage from "../StatusMessage";

import { z } from "zod";
import { fallenSchema } from "@/lib/fallenSchema";

export default function FallenForm ({ isOpen, contentLabel, profile = {}, onSave, onCancel }) {
    const [fallenData, setFallenData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        deathDate: "",
        hobbies: "",
        about: "",
        familyWords: "",
        quote: "",
        imageUrl: "",
        email: "",
        phone: "",
    });

    const [image, setImage] = useState(null);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toISOString().split("T")[0];
    };

    useEffect(() => {
        if (profile) {
            setFallenData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                birthDate: formatDate(profile.birthDate),
                deathDate: formatDate(profile.deathDate),
                hobbies: Array.isArray(profile.hobbies) ? profile.hobbies.map(hobby => hobby.name).join(", ") : "",
                about: profile.about || "",
                familyWords: profile.familyWords || "",
                quote: profile.quote || "",
                imageUrl: profile.imageUrl || "",
                email: profile.email || "",
                phone: profile.phone || "",
            });
        }
    }, [profile]);


    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const validateForm = () => {
        try {
            fallenSchema.parse(fallenData);

            setStatusMessage("");
            setStatusType("success");

            return true;
        } catch (error) {
            console.error("ZodError:", error);

            if (error instanceof z.ZodError) {
                const firstErrorMessage = error.errors[0].message;
                setStatusMessage(firstErrorMessage);
                setStatusType("error");
            }
            return false;
        }
    };

    const handleImageUpload = (e) => {
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

        const hobbiesArray = fallenData.hobbies.split(",").map(hobbyName => {
            hobbyName = hobbyName.trim();

            const existingHobby = (Array.isArray(profile.hobbies) ? profile.hobbies : []).find(h => h.name === hobbyName);

            return {
                name: hobbyName,
                continueCount: existingHobby ? existingHobby.continueCount : 0
            };
        });

        const profileData = {
            _id: profile._id,
            firstName: fallenData.firstName,
            lastName: fallenData.lastName,
            birthDate: fallenData.birthDate,
            deathDate: fallenData.deathDate,
            hobbies: hobbiesArray,
            about: fallenData.about,
            familyWords: fallenData.familyWords,
            quote: fallenData.quote,
            imageUrl: fallenData.imageUrl,
            email: fallenData.email,
            phone: fallenData.phone
        };

        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("data", JSON.stringify(profileData));

        if (image) {
            formData.append("image", image);
        }

        onSave(formData);
        setStatusMessage("");
        setStatusType("");
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
                        {fallenData.imageUrl ? (
                            <Image
                                className={styles.imagePreview}
                                src={fallenData.imageUrl}
                                alt={`${fallenData.firstName} ${fallenData.lastName} image`}
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
                                value={fallenData.firstName}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, firstName: e.target.value }))}
                                required />
                        </label>

                        <label>
                            שם משפחה:
                            <input
                                type="text"
                                value={fallenData.lastName}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, lastName: e.target.value }))}
                                required />
                        </label>
                    </div>

                    <div className={styles.dateInputs}>
                        <label>
                            תאריך לידה:
                            <input
                                type="date"
                                value={fallenData.birthDate}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, birthDate: e.target.value }))}
                                required />
                        </label>

                        <label>
                            תאריך פטירה:
                            <input
                                type="date"
                                value={fallenData.deathDate}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, deathDate: e.target.value }))}
                                required />
                        </label>
                    </div>
                </div>

                <br />

                <label className={styles.fullWidthLabel}>
                    תחביבים: (מופרדים באמצעות פסיק)
                    <textarea
                        value={fallenData.hobbies}
                        onChange={(e) => setFallenData((prev) => ({ ...prev, hobbies: e.target.value }))}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    ציטוט:
                    <input
                        type="text"
                        value={fallenData.quote}
                        onChange={(e) => setFallenData((prev) => ({ ...prev, quote: e.target.value }))}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    אודות:
                    <textarea
                        value={fallenData.about}
                        onChange={(e) => setFallenData((prev) => ({ ...prev, about: e.target.value }))}
                        required />
                </label>

                <label className={styles.fullWidthLabel}>
                    דבר המשפחה:
                    <textarea
                        value={fallenData.familyWords}
                        onChange={(e) => setFallenData((prev) => ({ ...prev, familyWords: e.target.value }))}
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
                                value={fallenData.email}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, email: e.target.value }))}
                                required />
                        </label>
                        <label>
                            פלאפון:
                            <input
                                type="number"
                                value={fallenData.phone}
                                onChange={(e) => setFallenData((prev) => ({ ...prev, phone: e.target.value }))}
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