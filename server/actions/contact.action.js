"use server";

import { connectToDB } from '@/server/connect';
import ContactForm from "@/server/models/contact.model";
import nodemailer from "nodemailer";

// פונקציה לבדיקה אם אימייל תקין
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// פונקציה לבדיקה אם מספר טלפון תקין (לישראל)
function isValidPhone(phone) {
  return /^(\+972|0)([23489]|5[0-9])[0-9]{7}$/.test(phone);
}

export async function submitContactForm(formData) {
  // בדיקה האם הנתונים הגיעו כ-FormData (מ-action) או כאובייקט רגיל (מ-handleSubmit)
  const isFormDataInstance = formData instanceof FormData;

  const data = {
    fullName: isFormDataInstance ? formData.get("fullName") : formData.fullName,
    email: isFormDataInstance ? formData.get("email") : formData.email,
    phone: isFormDataInstance ? formData.get("phone") : formData.phone,
    subject: isFormDataInstance ? formData.get("subject") : formData.subject,
    message: isFormDataInstance ? formData.get("message") : formData.message,
  };

  // בדיקות תקינות ידניות
  if (!data.fullName || data.fullName.length < 2) {
    throw new Error("שם מלא חייב להכיל לפחות 2 תווים");
  }
  if (!isValidEmail(data.email)) {
    throw new Error("אימייל לא תקין");
  }
  if (!isValidPhone(data.phone)) {
    throw new Error("מספר טלפון לא תקין");
  }
  if (!data.subject || data.subject.length < 2) {
    throw new Error("נושא חייב להכיל לפחות 2 תווים");
  }
  if (!data.message || data.message.length < 5) {
    throw new Error("תוכן הפניה חייב להכיל לפחות 5 תווים");
  }

  try {
    await connectToDB();
    // מתאימים את שם השדה למודל
    const contactData = {
      name: data.fullName, // השדה 'name' נדרש במודל
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    };
    
    const newContact = await ContactForm.create(contactData);
    
    try {
      // שליחת מייל אישור - תופס את השגיאה בנפרד כדי לא לפגוע בתהליך
      await sendConfirmationEmail(data.fullName, data.email, data.message);
    } catch (emailError) {
      console.error("שגיאה בשליחת אימייל אישור:", emailError);
      // ממשיכים למרות שגיאת האימייל
    }

    return { success: true, message: "ההודעה נשלחה בהצלחה!" };
  } catch (error) {
    console.error("שגיאה בשליחת הטופס:", error);
    throw new Error(error.message || "שגיאה בשליחה, נסה שוב");
  }
}

async function sendConfirmationEmail(name, email, message) {
  // בדיקה אם משתני הסביבה קיימים
  if (!process.env.GMAIL_ADDRESS || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("משתני סביבה של אימייל חסרים. לא ניתן לשלוח אימייל אישור.");
    return; // יוצאים מהפונקציה ללא שליחת מייל
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_ADDRESS,
      to: email,
      subject: "אישור קבלת פנייה",
      text: `שלום ${name},\n\nתודה שפנית אלינו. קיבלנו את ההודעה שלך ונחזור אליך בהקדם האפשרי.\n\nההודעה שלך: ${message}\n\nבברכה,\nצוות המיזם`,
    };

    await transporter.sendMail(mailOptions);
  } catch (emailError) {
    console.error("שגיאה בשליחת אימייל:", emailError);
    // ממשיכים בתהליך גם אם שליחת האימייל נכשלה
  }
}