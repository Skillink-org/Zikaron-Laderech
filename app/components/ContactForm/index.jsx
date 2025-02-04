import styles from './style.module.scss';

const ContactForm = () => {
  return (
    <form className={styles["contact-form"]}>
        <div className={styles["form-row"]}>
      <input type="text" placeholder="שם מלא" required />
      <input type="email" placeholder="אימייל" required />
      <input type="tel" placeholder="טלפון" required />
      </div>
      <input type="text" placeholder="נושא" required />
      <textarea placeholder="תוכן הפניה"></textarea>
      <button type="submit">שליחה</button>
    </form>
  );
};
  
  export default ContactForm;
  