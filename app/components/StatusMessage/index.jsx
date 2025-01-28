import styles from './style.module.scss';

const StatusMessage = ({ message, type }) => {
    return (
        <div className={`${styles.statusMessage} ${styles[type]}`}>
            <p className={styles.text}>{message}</p>
        </div >
    );
};

export default StatusMessage;
