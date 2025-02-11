import styles from './style.module.scss';
import { submitContactForm } from "@/server/serverContact";

const ContactForm = () => {
  return (
    <form action={submitContactForm} className={styles["contact-form"]}>
        <div className={styles["form-row"]}>
        <input type="text" name="fullName" placeholder="שם מלא" required />
        <input type="email" name="email" placeholder="אימייל" required />
        <input type="tel" name="phone" placeholder="טלפון" required />
      </div>
      <input type="text" name="subject" placeholder="נושא" required />
      <textarea name="message" placeholder="תוכן הפניה"></textarea>
      <button type="submit">שליחה</button>
    </form>
  );
};
  
  export default ContactForm;
  