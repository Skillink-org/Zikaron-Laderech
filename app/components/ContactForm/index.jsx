
'use client';
import { useState } from "react";
import styles from "./style.module.scss";
import GenericInput from "@/app/components/GenericInput"; // ייבוא הקומפוננטה הגנרית

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success");
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending form:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles["contact-form"]}>
      <div className={styles["form-row"]}>
        
        <GenericInput 
          type="text"
          name="fullName"
          placeholder="שם מלא"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <GenericInput 
          type="email"
          name="email"
          placeholder="אימייל"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <GenericInput 
          type="tel"
          name="phone"
          placeholder="טלפון"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <GenericInput 
     
        type="text"
        name="subject"
        placeholder="נושא"
        value={formData.subject}
        onChange={handleChange}
        required
      />
      <textarea 
     
        name="message"
        placeholder="תוכן הפניה"
        value={formData.message}
        onChange={handleChange}
        required
      />
      <button type="submit">שליחה</button>

      {status === "sending" && <p>שולח...</p>}
      {status === "success" && <p style={{ color: "green" }}>המייל נשלח בהצלחה!</p>}
      {status === "error" && <p style={{ color: "red" }}>שגיאה בשליחת המייל</p>}
    </form>
  );
};

export default ContactForm;
