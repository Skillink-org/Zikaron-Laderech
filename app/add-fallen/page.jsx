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
  const cloudName = process.env.CLOUDINARY_NAME;
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
    image: null,
    imageFile: null
  });

  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
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

      setFormData(prev => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file) 
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const parsed = fallenSchema.safeParse(formData);
    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map(err => err.message).join("\n");
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
  
      const [firstName, ...lastNameParts] = formData.fullName.trim().split(" ");
      const lastName = lastNameParts.join(" ");
  
      const hobbies = formData.hobbies
        .split(',')
        .map(hobby => hobby.trim())
        .filter(hobby => hobby)
        .map(name => ({
          name,
          continueCount: 0
        }));

      const response = await addFallen({
        fullName: formData.fullName,
        birthYear: formData.birthYear,
        deathDate: formData.deathDate,
        hobbies: formData.hobbies,
        about: formData.about,
        familyMessage: formData.familyMessage,
        imageFile: formData.imageFile,
        highlightQuote: formData.highlightQuote,
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.error || 'שגיאה בשמירת הנתונים');
      }
  
      setStatusMessage(`הנתונים נשמרו בהצלחה! ${result.data.firstName} ${result.data.lastName} נוסף למאגר.`);
      setStatusType("success");
  
      setTimeout(() => {
        setFormData({
          fullName: "",
          birthYear: "",
          deathDate: "",
          hobbies: "",
          about: "",
          familyMessage: "",
          image: null,
          imageFile: null
        });
      }, 3000);
  
    } catch (error) {
      setStatusMessage(error.message || "אירעה שגיאה. נא לנסות שוב.");
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
              {formData.image && (
                <img
                  src={formData.image}
                  alt="תצוגה מקדימה"
                  className={styles.imagePreview}
                  style={{ maxWidth: '100px', marginTop: '10px' }}
                />
              )}
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
