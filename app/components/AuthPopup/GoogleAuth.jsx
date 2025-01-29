import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

export default function GoogleAuth({ onSuccess, onFailure, className }) {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <div className={className}>
                <GoogleLogin
                    onSuccess={onSuccess}
                    onError={onFailure}
                    useOneTap
                />
            </div>
        </GoogleOAuthProvider>
    );
}
