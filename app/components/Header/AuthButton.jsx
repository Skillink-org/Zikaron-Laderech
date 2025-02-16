"use client"
import { useState } from 'react'
import AuthPopup from '../AuthPopup'
import Button from '../Button'
import styles from './style.module.scss'

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
            <Button onClick={openAuthPopup} className={styles.authButton}
            >
                התחברות
            </Button>
            {isAuthPopupOpen && <AuthPopup onClose={closeAuthPopup} />}
        </div>
    )
}
