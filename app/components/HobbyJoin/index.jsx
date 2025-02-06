'use client'
import { useState, useEffect } from 'react';
import HobbyBubble from '../HobbyBubble/index.jsx';
import { joinHobby } from '@/server/actions/fallen.action';
import StatusMessage from '../StatusMessage/index.jsx';

export default function HobbyJoin({
    fallenId,
    hobby,
    dynamicBackgroundClassName = "",
    className = "",
}) {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => {
                setStatus(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const onClick = async () => {
        const response = await joinHobby(fallenId, hobby);
        if (!response.ok) {
            setStatus({ message: "ההצטרפות לתחביב נכשלה", type: "error" });
        } else {
            setStatus({ message: "הצטרפת בהצלחה לתחביב!", type: "success" });
        }
    }

    return (
        <>
            <HobbyBubble
                children={hobby}
                className={className}
                dynamicBackgroundClassName={dynamicBackgroundClassName}
                plusMode={true}
                onClick={onClick}
            />
            {status && <StatusMessage message={status.message} type={status.type} />}
        </>
    );
}