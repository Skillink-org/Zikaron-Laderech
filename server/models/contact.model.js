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
}, { timestamps: true }); // מוסיף createdAt ו-updatedAt

// אם המודל כבר קיים, נמנע יצירה מחדש
// שם המודל במסד נתונים - Contact
const ContactForm = mongoose.models.ContactForm || mongoose.model("ContactForm", ContactSchema);

export default ContactForm;
