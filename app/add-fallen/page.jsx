"use client";
import { useState } from "react";
import styles from "./page.module.scss";
import ImageWithTitle from "../components/ImageWithTitle/index";
import Button from "../components/Button";
import StatusMessage from "../components/StatusMessage";
import CustomBubble from "../components/CustomBubble";
import { uploadImage } from "@/server/actions/uploadImage.action";


// TODO-YOSEF: replace fetch with action
// TODO-YOSEF: replace form manual validation with zod


export default function AddFallenPage() {
  const cloudName = process.env.CLOUDINARY_NAME;
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
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
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

    if (name === "email") {
      if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) return;
    }

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
        image: URL.createObjectURL(file) // save the image for preview purposes
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setStatusMessage("מעלה תמונה...");
      setStatusType("loading");

      const formDataToSend = new FormData();
      formDataToSend.append("image", formData.imageFile);
      const imageUrl = await uploadImage(formDataToSend);

      //format the hobbies into an array of objects
      const hobbies = formData.hobbies
        .split(',')
        .map(hobby => hobby.trim())
        .filter(hobby => hobby)
        .map(name => ({
          name,
          continueCount: 0
        }));

      //send the form data to the server
      const response = await fetch('/api/add-fallen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: new Date(formData.birthYear),
          deathDate: new Date(formData.deathDate),
          hobbies,
          about: formData.about,
          familyWords: formData.familyMessage,
          quote: formData.quote,
          imageUrl,
          email: formData.email,
          phone: formData.phone,
          status: "pending"
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'שגיאה בשמירת הנתונים');
      }

      setStatusMessage(`הנתונים נשמרו בהצלחה! 
        ${result.data.firstName} ${result.data.lastName} נוסף למאגר וממתין לאישור.`);
      setStatusType("success");

      //reset the form
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
          phone: ""
        });
      }, 3000);

    } catch (error) {
      console.error("שגיאה:", error);
      setStatusMessage(error.message || "אירעה שגיאה. נא לנסות שוב.");
      setStatusType("error");
    }
  };


  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imageFile: null
    }));
  };

  //validation function
  const validateForm = () => {
    if (!formData.firstName) {
      setStatusMessage("נא להזין שם פרטי");
      setStatusType("error");
      return false;
    }

    if (!formData.lastName) {
      setStatusMessage("נא להזין שם משפחה");
      setStatusType("error");
      return false;
    }

    if (!formData.birthYear) {
      setStatusMessage("נא להזין שנת לידה");
      setStatusType("error");
      return false;
    }

    if (!formData.deathDate) {
      setStatusMessage("נא להזין תאריך פטירה");
      setStatusType("error");
      return false;
    }

    if (!formData.hobbies.trim()) {
      setStatusMessage("נא להזין לפחות תחביב אחד");
      setStatusType("error");
      return false;
    }

    if (!formData.about.trim()) {
      setStatusMessage("נא להזין מידע אודות הנופל");
      setStatusType("error");
      return false;
    }

    if (!formData.familyMessage.trim()) {
      setStatusMessage("נא להזין מסר מהמשפחה");
      setStatusType("error");
      return false;
    }

    if (!formData.imageFile) {
      setStatusMessage("נא להעלות תמונה");
      setStatusType("error");
      return false;
    }

    return true;
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
              name="quote"
              value={formData.quote}
              onChange={handleChange}
              className={styles.quote}
              placeholder="ציטוט או משפט חשוב מהנופל"
              required
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
                placeholder="אימייל ליצירת קשר"
                required
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
