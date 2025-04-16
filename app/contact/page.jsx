import styles from "./style.module.scss";
import ContactForm from '@/app/components/ContactForm';
import Link from "next/link";
import ImageWithTitle from '../components/ImageWithTitle';
import CustomBubble from '../components/CustomBubble';

const ContactPage = () => {
  return (
    <>
      {/* Header image section */}
      <ImageWithTitle
        imageUrl={"/profileImage.webp"}
        title="יצירת קשר"
        subtitle="יחד נוכל להמשיך את המסע של יקירינו ולהפוך את זכרם לפיסה חיה ומתמשכת"
      />

      {/* Contact form section */}
      <ContactForm />

      {/* Social media section */}
      <div className={styles.socialButtons}>
        <Link href="https://facebook.com" target="_blank">
          <CustomBubble className={styles.socialButton}>
            <p className={styles.socialTitle}>Facebook</p>
            <p className={styles.socialText}>אנחנו גם בפייסבוק</p>
          </CustomBubble>
        </Link>
        <Link href="https://instagram.com" target="_blank">
          <CustomBubble className={styles.socialButton}>
            <p className={styles.socialTitle}>Instagram</p>
            <p className={styles.socialText}>אנחנו גם באינסטגרם</p>
          </CustomBubble>
        </Link>
        <Link href="https://twitter.com" target="_blank">
          <CustomBubble className={styles.socialButton}>
            <p className={styles.socialTitle}>X</p>
            <p className={styles.socialText}>אנחנו גם ב-X (לשעבר טוויטר)</p>
          </CustomBubble>
        </Link>
      </div>
    </>
  );
};

export default ContactPage;