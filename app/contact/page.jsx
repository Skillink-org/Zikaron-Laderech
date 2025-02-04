import styles from './style.module.scss'
import Image from 'next/image';
import ContactForm from '@/app/components/ContactForm';
import Link from "next/link";


const ContactPage = () => {
  return (
    <div className={styles["contact-container"]}>
      <div className={styles["header-image"]}>
        <Image
          src="/contact.png"
          alt="יצירת קשר"
          width={1400}
          height={300}
          className={styles["contact-image"]}
        />
      </div>
      
      <ContactForm />

      <div className={styles["social-buttons"]}>
        <Link href="https://twitter.com" target="_blank" className={styles["social-button"]}>
          <span className={styles["social-title"]}>X</span>
          <span className={styles["social-text"]}>אנחנו גם ב-X (טוויטר לשעבר)</span>
        </Link>

        <Link href="https://instagram.com" target="_blank" className={styles["social-button"]}>
          <span className={styles["social-title"]}>Instagram</span>
          <span className={styles["social-text"]}>אנחנו גם באינסטגרם</span>
        </Link>

        <Link href="https://facebook.com" target="_blank" className={styles["social-button"]}>
          <span className={styles["social-title"]}>Facebook</span>
          <span className={styles["social-text"]}>אנחנו גם בפייסבוק</span>
        </Link>
      </div>
    </div>
  );
};

export default ContactPage;


