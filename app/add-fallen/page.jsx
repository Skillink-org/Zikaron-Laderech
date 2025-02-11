"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ImageWithTitle from "../components/ImageWithTitle/index";
import Button from "../components/Button";
import StatusMessage from "../components/StatusMessage";
import CustomBubble from "../components/CustomBubble";
import { uploadImage } from "@/server/actions/uploadImage.action";
import { addFallen } from "@/server/actions/addFallen.action";
import { fallenSchema } from "@/lib/zod/fallenSchema";

export default function AddFallenPage() {
  const currentYear = new Date().getFullYear();
  const todayDate = new Date().toISOString().split("T")[0];
  const minDeathDate = "2023-10-07";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthYear: "",
    deathDate: "",
    hobbies: "",
    about: "",
    familyMessage: "",
    quote: "",
    image: null,
    imageFile: null,
    email: "",
    phone: ""
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setStatusMessage("נא להעלות קובץ תמונה בלבד");
        setStatusType("error");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setStatusMessage("התמונה גדולה מדי. נא להעלות תמונה עד 5MB");
        setStatusType("error");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsed = fallenSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((err) => err.message).join("\n");
      setStatusMessage(errorMessages);
      setStatusType("error");
      return;
    }

    try {
      setStatusMessage("מעלה תמונה...");
      setStatusType("loading");

      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.imageFile);
      const imageUrl = await uploadImage(formDataToSend);

      const response = await addFallen({
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthYear: formData.birthYear,
        deathDate: formData.deathDate,
        hobbies: formData.hobbies,
        about: formData.about,
        familyMessage: formData.familyMessage,
        quote: formData.quote,
        imageUrl,
        email: formData.email,
        phone: formData.phone,
      });

      if (!response.ok) {
        throw new Error(response.error || "שגיאה בשמירת הנתונים");
      }

      setStatusMessage("הנתונים נשמרו בהצלחה!");
      setStatusType("success");

      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          birthYear: "",
          deathDate: "",
          hobbies: "",
          about: "",
          familyMessage: "",
          quote: "",
          image: null,
          imageFile: null,
          email: "",
          phone: "",
        });
      }, 3000);
    } catch (error) {
      setStatusMessage(error.message || "אירעה שגיאה. נא לנסות שוב.");
      setStatusType("error");
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      image: null,
      imageFile: null,
    }));
  };

  return (
    <>
      <div className={styles.header}>
        <ImageWithTitle
          imageUrl={"/profileImage.webp"}
          title={"הוספת נופל למיזם"}
          subtitle={
            "הוסיפו את יקירכם למאגר של המיזם. נא למלא מידע ככל האפשר על הנופל והקשר שלו לתחביב. אנו נעבור על המידע ונפרסם אותו. במידה שנפלה טעות, נעדכן אתכם."
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className={styles.name}
                placeholder="שם פרטי"
              />
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className={styles.name}
                placeholder="שם משפחה"
              />
            </div>
            <div className={styles.line1}>
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
                type="date"
                name="deathDate"
                value={formData.deathDate}
                onChange={handleChange}
                required
                className={styles.date}
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
              required
              placeholder="דברים שתרצו לשתף"
            />

            <input
              type="text"
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              className={styles.quote}
              required
              placeholder="ציטוט או משפט חשוב מהנופל"
            />

            <label className={styles.customFileUpload}>
              <img src={"/upload.svg"} width={26} height={26} alt="Upload icon" />
              העלאת תמונה
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className={styles.hiddenInput}
              />
              {formData.image && (
                <div className={styles.imageContainer}>
                  <img
                    src={formData.image}
                    alt="תצוגה מקדימה"
                    className={styles.imagePreview}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className={styles.removeImage}
                  >
                    ✕
                  </button>
                </div>
              )}
            </label>

            <div className={styles.line1}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.email}
                required
                placeholder="אימייל ליצירת קשר"
              />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.phone}
                placeholder="מספר פלאפון ליצירת קשר"
              />
            </div>

            <Button type="submit" className={styles.submitButton}>
              שליחה
            </Button>
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
