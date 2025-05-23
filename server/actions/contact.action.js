"use server";

import { connectToDB } from '@/server/connect';
import ContactForm from "@/server/models/contact.model";
import nodemailer from "nodemailer";
import { sendContactFormNotification } from '@/lib/email';

// Function to validate email
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Function to validate phone number (for Israel)
function isValidPhone(phone) {
  return /^(\+972|0)([23489]|5[0-9])[0-9]{7}$/.test(phone);
}

export async function submitContactForm(formData) {
  // Check if data came as FormData (from action) or regular object (from handleSubmit)
  const isFormDataInstance = formData instanceof FormData;

  const data = {
    fullName: isFormDataInstance ? formData.get("fullName") : formData.fullName,
    email: isFormDataInstance ? formData.get("email") : formData.email,
    phone: isFormDataInstance ? formData.get("phone") : formData.phone,
    subject: isFormDataInstance ? formData.get("subject") : formData.subject,
    message: isFormDataInstance ? formData.get("message") : formData.message,
  };

  // Manual validation checks
  if (!data.fullName || data.fullName.length < 2) {
    throw new Error("Full name must contain at least 2 characters");
  }
  if (!isValidEmail(data.email)) {
    throw new Error("Invalid email");
  }
  if (!isValidPhone(data.phone)) {
    throw new Error("Invalid phone number");
  }
  if (!data.subject || data.subject.length < 2) {
    throw new Error("Subject must contain at least 2 characters");
  }
  if (!data.message || data.message.length < 5) {
    throw new Error("Message must contain at least 5 characters");
  }

  try {
    await connectToDB();
    // Adjust field name to match model
    const contactData = {
      name: data.fullName, // 'name' field required in model
      email: data.email,
      phone: data.phone,
      subject: data.subject,
      message: data.message
    };
    
    const newContact = await ContactForm.create(contactData);
    
    try {
      // Send confirmation email - catch error separately to not affect process
      await sendConfirmationEmail(data.fullName, data.email, data.message);
      
      // Send admin notification
      await sendContactFormNotification(contactData);
    } catch (emailError) {
      console.error("Email sending error:", emailError);
      // Continue process even if email sending failed
    }

    return { success: true, message: "Message sent successfully!" };
  } catch (error) {
    console.error("Error sending form:", error);
    throw new Error(error.message || "Error sending, please try again");
  }
}

async function sendConfirmationEmail(name, email, message) {
  // Check if environment variables exist
  if (!process.env.GMAIL_ADDRESS || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("Email environment variables are missing. Email confirmation cannot be sent.");
    return; // Exit function without sending email
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
      subject: "Confirmation of receiving your message",
      text: `Hello ${name},\n\nThank you for contacting us. We have received your message and we will get back to you as soon as possible.\n\nYour message: ${message}\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);
  } catch (emailError) {
    console.error("Email sending error:", emailError);
    // Continue process even if email sending failed
  }
}