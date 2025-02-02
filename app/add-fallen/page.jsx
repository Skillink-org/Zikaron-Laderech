"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ImageWithTitle from "../components/ImageWithTitle/index";
import Button from "../components/Button";
import StatusMessage from "../components/StatusMessage";
import CustomBubble from "../components/CustomBubble";

export default function AddFallenPage() {
  const cloudName = process.env.CLOUDINARY_NAME;
  // const uploadPresent = process.env.;
  const currentYear = new Date().getFullYear();
  const todayDate = new Date().toISOString().split("T")[0];
  const minDeathDate = "2023-10-07";

  const [formData, setFormData] = useState({
    fullName: "",
    birthYear: "",
    deathDate: "",
    hobbies: "",
    about: "",
    familyMessage: "",
    highlightQuote: "",
    image: null,
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      if (!/^[a-zA-Zא-ת\s]*$/.test(value)) return;
    }

    if (name === "birthYear") {
      const numValue = parseInt(value, 10);
      if (numValue < 0 || numValue > currentYear) return;
    }

    if (name === "hobbies") {
      const hobbiesArray = value
        .split(",")
        .map((hobby) => hobby.trim())
        .filter((hobby) => hobby !== "");
      if (hobbiesArray.length > 6) return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("come");

    try {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("file", formData.image);
      imageData.append("upload_preset", uploadPresent); // Replace with your Cloudinary preset

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: imageData,
        }
      );

      if (!cloudinaryResponse.ok) throw new Error("Failed to upload image");

      const imageResponse = await cloudinaryResponse.json();
      const imageUrl = imageResponse.secure_url;

      // Send form data to the server
      const response = await fetch("/api/add-fallen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to save data");

      setStatusMessage("ההודעה נשלחה בהצלחה! תודה רבה");
      setStatusType("success");
      setFormData({
        fullName: "",
        birthYear: "",
        deathDate: "",
        hobbies: "",
        about: "",
        familyMessage: "",
        highlightQuote: "",
        image: null,
      });
    } catch (error) {
      setStatusMessage("אירעה שגיאה. נא לנסות שוב.");
      setStatusType("error");
    }
  };

  return (
    <>
      <div className={styles.header}>
        <ImageWithTitle
          imageUrl={"/profileImage.webp"}
          title={"הוספת נופל למיזם"}
          subtitle={
            "הוסיפו את יקירכם למאגר של המיזם. נא למלא מידע ככל האפשר על הנופל והקשר שלו לתחביב. אנו נעבור על המידע ונפרסם אותו. במידה שנפלה טעות, נעדכן אתכם"
          }
          style={{ height: "300px" }}
        />
      </div>

      <CustomBubble>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.allFormDetails}>
            <div className={styles.line1}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className={styles.name}
                placeholder="שם מלא"
              />
              <input
                type="number"
                name="birthYear"
                value={formData.birthYear}
                onChange={handleChange}
                required
                className={styles.birthDate}
                placeholder="שנת לידה"
                min="0"
                max={currentYear}
              />
              <input
                type="text"
                name="deathDate"
                value={formData.deathDate}
                onChange={handleChange}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => {
                  if (!e.target.value) e.target.type = "text";
                }}
                required
                className={styles.date}
                placeholder="תאריך פטירה"
                min={minDeathDate}
                max={todayDate}
              />
            </div>

            <input
              type="text"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              className={styles.hobbies}
              required
              placeholder="תחביבים (מופרדים בפסיקים)"
            />

            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              className={styles.about}
              placeholder="ספרו לנו על יקירכם"
            />

            <textarea
              name="familyMessage"
              value={formData.familyMessage}
              onChange={handleChange}
              className={styles.familyMessage}
              placeholder="דברים שתרצו לשתף"
              required
            />

            <input
              type="text"
              name="highlightQuote"
              value={formData.highlightQuote}
              onChange={handleChange}
              className={styles.highlightQuote}
              placeholder="ציטוט או משפט חשוב מהנופל"
              required
            />

            <label className={styles.customFileUpload}>
              העלאת תמונה
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className={styles.hiddenInput}
              />
            </label>

            <Button
              type="submit"
              className={styles.submitButton}
              children={"שליחה"}
            />
          </div>
        </form>
      </CustomBubble>

        {statusMessage && (
          <div className={styles.statusMessage}>
            <StatusMessage message={statusMessage} type={statusType} />
          </div>
        )}
    </>
  );
}
