'use client'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { joinHobby } from '@/server/actions/fallen.action';
import AuthPopup from '@/app/components/AuthPopup';
import HobbyBubble from '@/app/components/HobbyBubble';
import StatusMessage from '@/app/components/StatusMessage';
import styles from './style.module.scss';

export default function HobbyList({ fallenName, fallenId, hobbies, updateHobby}) {
    const { data: session } = useSession();
    const [statusMessage, setStatusMessage] = useState('');
    const [statusType, setStatusType] = useState('');
    const [showStatus, setShowStatus] = useState(false);
    const [showAuthPopup, setShowAuthPopup] = useState(false);

    const updateStatus = (message, type) => {
        setStatusMessage(message);
        setStatusType(type);
        setShowStatus(true);

        // Status will disappear automatically through the toast component
    };

    const hideStatus = () => {
        setShowStatus(false);
    };

    async function handleClick(fallenId, hobby) {
        if (!session) {
            setShowAuthPopup(true);
            return;
        }

        const userId = session.user.id;
        const response = await joinHobby(fallenId, hobby, userId);

        if (response.ok) {
            updateHobby(hobby);
            updateStatus("הצטרפת בהצלחה לתחביב!", "success");
        }
        else if (response.status === 404) {
            updateStatus('הצטרפותך לתחביב נכשלה', "error");
        } else if (response.status === 400) {
            updateStatus(`כבר נרשמת לתחביב ה${hobby} של ${fallenName}`, "error");
        } else {
            updateStatus(response.message, "error");
        }
    }

    return (
        <>
            {showAuthPopup && <AuthPopup onClose={() => setShowAuthPopup(false)} />}
            <div className={styles.hobbies}>
                {showStatus && 
                    <StatusMessage 
                        message={statusMessage} 
                        type={statusType} 
                        mode="toast" 
                        onHide={hideStatus} 
                    />
                }
                {hobbies.map((hobby, index) => (
                    <HobbyBubble
                        children={hobby.name}
                        plusMode={true}
                        key={index}
                        dynamicBackgroundClassName={styles.hobby}
                        className={`${styles.hobbyBubble}`}
                        onClick={() => handleClick(fallenId, hobby.name)}
                    />
                ))}
            </div>
        </>
    );
}