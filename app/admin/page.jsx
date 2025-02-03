"use client";

import { useState } from "react";
import Modal from "react-modal";

import styles from './page.module.scss'

import Image from "next/image"


export default function AdminPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const [status, setStatus] = useState('');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    };

    const applyFilter = () => {
        console.log('Filtering by status:', status);

        // TODO: Implement the filtering logic here based on the selected 'status'.

        closeModal();
    };

    function handleChange(e) {
        setSearchQuery(e.target.value);

        // TODO: Implement the filtering logic here based on the search query.
    }

    return (
        <>
            <div className={styles.wrapper}>

                <div className={styles.searchContainer}>
                    <Image
                        src="/search-icon.svg"
                        alt="Search icon"
                        className={styles.searchIcon}
                        width={20}
                        height={20}
                    />

                    <input
                        type="search"
                        value={searchQuery}
                        className={styles.searchInput}
                        placeholder=" חיפוש לפי שם של נופל..."
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={openModal}
                >
                    <Image
                        src="/filterIcon.svg"
                        alt="Filter icon"
                        className={styles.filterIcon}
                        width={24}
                        height={24}
                    />
                    סינון
                </button>

                <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    contentLabel="סינון רשומות"
                    className={styles.modal}
                    overlayClassName={styles.modalOverlay}
                    ariaHideApp={false}
                >
                    <button className={styles.closeButton} onClick={closeModal}>
                        <Image
                            src="/closeIcon.svg"
                            alt="Filter icon"
                            className={styles.filterIcon}
                            width={20}
                            height={20}
                        />
                    </button>

                    <h2>סינון רשומות</h2>

                    <label htmlFor="status">סטטוס:</label>
                    <select id="status" value={status} onChange={handleStatusChange}>
                        <option value="">הכל</option>
                        <option value="pending">ממתין לאישור</option>
                        <option value="approved">מאושר</option>
                        <option value="rejected">נדחה</option>
                    </select>


                    <button className={styles.applyButton} onClick={applyFilter}>החל סינון</button>
                </Modal>
            </div>
            <br /><br /><br />
        </>
    )
}
