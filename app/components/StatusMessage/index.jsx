import styles from './style.module.scss';

/**
 * קומפוננטה להצגת הודעות סטטוס למשתמש
 * @param {string} props.message - תוכן ההודעה להצגה
 * @param {'success' | 'error'} props.type - סוג ההודעה: 
 *   - 'success' - הודעת הצלחה עם רקע כחול בהיר
 *   - 'error' - הודעת שגיאה עם רקע ורוד בהיר
 */

const StatusMessage = ({ message, type }) => {
    return (
        <div className={`${styles.statusMessage} ${styles[type]}`}>
            <p className={styles.text}>{message}</p>
        </div >
    );
};

export default StatusMessage;
