"use server";

import { connect, connectToDBToDB } from '@/server/connect';
import ContactForm from "@/server/models/contact.model";
import nodemailer from "nodemailer";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
  return /^(\+972|0)([23489]|5[0-9])[0-9]{7}$/.test(phone);
}

export async function submitContactForm(formData) {
  const data = {
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  if (!data.fullName || data.fullName.length < 2) {
    return { error: "שם מלא חייב להכיל לפחות 2 תווים" };
  }
  if (!isValidEmail(data.email)) {
    return { error: "אימייל לא תקין" };
  }
  if (!isValidPhone(data.phone)) {
    return { error: "מספר טלפון לא תקין" };
  }
  if (!data.subject || data.subject.length < 2) {
    return { error: "נושא חייב להכיל לפחות 2 תווים" };
  }
  if (!data.message || data.message.length < 5) {
    return { error: "תוכן הפניה חייב להכיל לפחות 5 תווים" };
  }

  try {
    await connectToDB();
    const newContact = await ContactForm.create(data);
    
    await sendConfirmationEmail(data.fullName, data.email, data.message);

    return { success: "ההודעה נשלחה בהצלחה!" };
  } catch (error) {
    return { error: "שגיאה בשליחה, נסה שוב" };
  }
}

async function sendConfirmationEmail(name, email, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "אישור קבלת פנייה",
    text: `שלום ${name},\n\nתודה שפנית אלינו. קיבלנו את ההודעה שלך ונחזור אליך בהקדם האפשרי.\n\nההודעה שלך: ${message}\n\nבברכה,\nצוות המיזם`,
  };

  await transporter.sendMail(mailOptions);
}
