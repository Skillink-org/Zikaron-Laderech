"use client"
import { useState } from 'react'
import AuthPopup from '../AuthPopup'
import Button from '../Button'

export default function AuthButton() {
    const [isAuthPopupOpen, setAuthPopupOpen] = useState(false)

    const openAuthPopup = () => {
        setAuthPopupOpen(true)
    }

    const closeAuthPopup = () => {
        setAuthPopupOpen(false)
    }

    return (
        <div>
            <Button onClick={openAuthPopup}>
                התחברות
            </Button>
            {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}
        </div>
    )
}
