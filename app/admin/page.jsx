"use client";

import { useState } from "react";
import Modal from "react-modal";

import styles from './page.module.scss'

import Image from "next/image"

import FallenForm from "../components/FallenForm";

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

    // TODO: Replace the static data with real data from the database
    const [fallenData, setFallenData] = useState([
        { date: '01/02/2025', fullName: 'ישראל ישראלי', status: 'ממתין לאישור' },
        { date: '02/02/2025', fullName: 'ישראל ישראלי', status: 'מאושר' },
        { date: '03/02/2025', fullName: 'ישראל ישראלי', status: 'נדחה' }
    ]);

    const getStatusClass = (status) => {
        switch (status) {
            case 'ממתין לאישור':
                return styles.pending;
            case 'מאושר':
                return styles.approved;
            case 'נדחה':
                return styles.rejected;
            default:
                return '';
        }
    };

    const [selectedProfile, setSelectedProfile] = useState({});
    const [isEditFallenOpen, setIsEditFallenOpen] = useState(false);
    const openEditFallenModal = (profile) => {
        setSelectedProfile(profile);
        setIsEditFallenOpen(true)
    };
    const closeEditFallenModal = () => {
        setSelectedProfile({});
        setIsEditFallenOpen(false);
    };

    const editFallenProfile = (profile) => {
        // TODO: Implement here the logic to edit the profile

        closeEditFallenModal();
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
                            alt="Close icon"
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

            <table className={styles.fallenTable}>
                <thead>
                    <tr>
                        <th>תאריך הגשה</th>
                        <th>שם הנופל</th>
                        <th>סטטוס</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {fallenData.map((item, index) => (
                        <tr key={index}>
                            <td className={styles.date}>{item.date}</td>

                            <td>{item.fullName}</td>

                            <td>
                                <span className={`${styles.status} ${getStatusClass(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>

                            <td className={styles.actions}>
                                <button
                                    type="button"
                                // onClick={}
                                // TODO: Implement a function to approve the profile
                                >
                                    <Image
                                        src="/approveIcon.svg"
                                        alt="Approve icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>

                                <button
                                    type="button"
                                    onClick={() => openEditFallenModal(item)}
                                >
                                    <Image
                                        src="/editIcon.svg"
                                        alt="Edit icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>

                                <button
                                    type="button"
                                // onClick={}
                                // TODO: Implement a function to reject the profile
                                >
                                    <Image
                                        src="/rejectIcon.svg"
                                        alt="Reject icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={isEditFallenOpen}
                onRequestClose={closeEditFallenModal}
                contentLabel="עריכת נופל"
                className={styles.modalEditFallen}
                overlayClassName={styles.modalOverlay}
                ariaHideApp={false}
            >
                <button className={styles.closeButtonEditFallenModal} onClick={closeEditFallenModal}>
                    <Image
                        src="/closeIcon.svg"
                        alt="Close icon"
                        width={20}
                        height={20}
                    />
                </button>

                <FallenForm profile={selectedProfile} onSave={editFallenProfile} onCancel={closeEditFallenModal} />
            </Modal>
        </>
    )
}
