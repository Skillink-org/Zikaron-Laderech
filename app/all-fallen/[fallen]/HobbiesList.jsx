'use client'
import { useState } from 'react';
import StatusMessage from '@/app/components/StatusMessage';
import styles from './page.module.scss';
import HobbyBubble from '@/app/components/HobbyBubble';
import { useSession } from 'next-auth/react';
import { joinHobby } from '@/server/actions/fallen.action';
import AuthPopup from '@/app/components/AuthPopup';

export default function HobbiesList({ hobbies, fallenName, fallenId }) {
    const { data: session } = useSession();
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const updateStatus = (message, type) => {
        setStatusMessage(message);
        setStatusType(type);
        setShowStatus(true);

        setTimeout(() => {
            setShowStatus(false);
        }, 3000);
    };

    async function handleClick(fallenId, hobby) {
        if (!session) {
            setShowAuthPopup(true);
            return;
        }

        const userId = session.user.id;
        const response = await joinHobby(fallenId, hobby, userId);

        if (response.ok) {
            updateStatus("הצטרפת בהצלחה לתחביב!", "success");
        }
        else if (response.status === 404) {
            updateStatus('הצטרפותך לתחביב נכשלה', "error");
        } else if (response.status === 400) {
            updateStatus(`כבר נרשמת לתחביב ${hobby} של ${fallenName}`, "error");
        } else {
            updateStatus(response.message, "error");
        }
    }

    return (
        <div className={styles.hobbies}>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            {hobbies.map((hobby, index) => (
                <HobbyBubble
                    children={hobby}
                    plusMode={true}
                    key={index}
                    dynamicBackgroundClassName={styles.hobby}
                    className={`${styles.hobbyBubble}`}
                    onClick={() => handleClick(fallenId, hobby)}
                />
            ))}
            {showStatus && <StatusMessage message={statusMessage} type={statusType} />}
        </div>
    );
}
