import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Prevent model recreation if it already exists
// Model name in database - Contact
const ContactForm = mongoose.models.ContactForm || mongoose.model("ContactForm", ContactSchema);

export default ContactForm;
