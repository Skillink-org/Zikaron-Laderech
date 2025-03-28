import Button from '../Button';
import CustomBubble from '../CustomBubble';
import styles from './style.module.scss';
import { submitContactForm } from "@/server/serverContact";

// TODO-YOSEF: add submit handler
// TODO-YOSEF: use Generic Input component

const ContactForm = () => {
  return (
    <CustomBubble>
      <form action={submitContactForm} className={styles["contact-form"]}>
        <div className={styles["form-row"]}>
          <input type="text" name="fullName" placeholder="שם מלא" required />
          <input type="email" name="email" placeholder="אימייל" required />
          <input type="tel" name="phone" placeholder="טלפון" required />
        </div>
        <input type="text" name="subject" placeholder="נושא" required />
        <textarea name="message" placeholder="תוכן הפניה"></textarea>
        <Button type="submit" className={styles.submitButton}>שליחה</Button>
      </form>
    </CustomBubble>
  );
};
  
export default ContactForm;