/**
 * קומפוננטה להצגת הודעות סטטוס למשתמש
 * @param {string} props.message - תוכן ההודעה להצגה
 * @param {'success' | 'error'} props.type - סוג ההודעה: 
 *   - 'success' - הודעת הצלחה עם רקע כחול בהיר
 *   - 'error' - הודעת שגיאה עם רקע ורוד בהיר
 * @param {'default' | 'toast'} props.mode - מצב תצוגה: 
 *   - 'default' - הודעה רגילה (ברירת מחדל)
 *   - 'toast' - הודעה שמופיעה בתחתית המסך ונעלמת אוטומטית
 * @param {function} props.onHide - פונקציה שתיקרא כאשר הטוסט נעלם (אופציונלי)
 */

'use client'
import { useEffect } from 'react';
import styles from './style.module.scss';

const StatusMessage = ({ message, type, mode = 'default', onHide }) => {
    useEffect(() => {
        // אם במצב טוסט, נפעיל טיימר להעלמה אוטומטית
        if (mode === 'toast' && onHide) {
            const timer = setTimeout(() => {
                onHide();
            }, 3000);
            
            return () => clearTimeout(timer);
        }
    }, [mode, onHide]);

    const messageClasses = [
        styles.statusMessage,
        styles[type],
        mode === 'toast' ? styles.toast : ''
    ].filter(Boolean).join(' ');

    return (
        <div className={messageClasses}>
            <p className={styles.text}>{message}</p>
        </div>
    );
};

export default StatusMessage;