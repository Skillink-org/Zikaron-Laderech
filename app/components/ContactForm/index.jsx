"use client";

import { useState } from 'react';
import Button from '../Button';
import CustomBubble from '../CustomBubble';
import GenericInput from '../GenericInput';
import styles from './style.module.scss';
import { submitContactForm } from "@/server/actions/contact.action";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitContactForm(formData);
      setStatus({ message: 'פנייתך התקבלה בהצלחה!', type: 'success' });
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ message: error.message || 'אירעה שגיאה בשליחת הטופס', type: 'error' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <CustomBubble>
      <form onSubmit={handleSubmit} className={styles["contact-form"]}>
        <div className={styles["form-row"]}>
          <GenericInput
            type="text"
            name="fullName"
            placeholder="שם מלא"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          
          <GenericInput
            type="email"
            name="email"
            placeholder="אימייל"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <GenericInput
            type="tel"
            name="phone"
            placeholder="טלפון"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <GenericInput
          type="text"
          name="subject"
          placeholder="נושא"
          value={formData.subject}
          onChange={handleChange}
          required
        />
        
        <textarea
          name="message"
          placeholder="תוכן הפניה"
          value={formData.message}
          onChange={handleChange}
        />
        
        <Button 
          type="submit" 
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'שולח...' : 'שליחה'}
        </Button>
        
        {status.message && (
          <div className={styles[status.type]}>
            {status.message}
          </div>
        )}
      </form>
    </CustomBubble>
  );
};
  
export default ContactForm;