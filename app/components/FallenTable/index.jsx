"use client";

import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from './style.module.scss'

import Image from "next/image"

import FallenForm from "../FallenForm";

// TODO-YOSEF: talk with Refael about popup system - with zustand

export default function FallenTable({ fallenData }) {
    const [filteredFallenData, setFilteredFallenData] = useState(fallenData);
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('');
    const [previousStatus, setPreviousStatus] = useState('');

    const filterData = (searchQuery, status) => {
        let filteredData = [...fallenData];

        if (status !== "") {
            filteredData = filteredData.filter(item => item.status === status);
        }

        if (searchQuery !== "") {
            filteredData = filteredData.filter(item => {
                const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
                return fullName.includes(searchQuery.trim());
            });
        }

        setFilteredFallenData(filteredData);
    };

    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        filterData(query, status);
    }

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setStatus(previousStatus);
        setIsOpen(false);
    };

    const handleStatusChange = (e) => {
        setPreviousStatus(status);
        setStatus(e.target.value);
    };

    const applyFilter = () => {
        filterData(searchQuery, status);

        closeModal();
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return styles.pending;
            case "approved":
                return styles.approved;
            case "rejected":
                return styles.rejected;
            default:
                return "";
        }
    };

    const approveFallen = async (id) => {
        try {
            const response = await fetch('/api/approve-fallen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result.success) {
                console.log(`The profile ${result.data.firstName} ${result.data.lastName} has been approved.`);
                setFilteredFallenData(prevData => prevData.map(fallen =>
                    fallen._id === id ? result.data : fallen
                ));
            } else {
                console.error("Approval failed:", result.error);
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const [isRejectFallenModalOpen, setIsRejectFallenModalOpen] = useState(false);
    const [selectedProfileId, setSelectedProfileId] = useState({});
    const [note, setNote] = useState('');

    const openRejectFallenModal = (id) => {
        setSelectedProfileId(id);
        setIsRejectFallenModalOpen(true);
    };
    const closeRejectFallenModal = () => {
        setSelectedProfileId('');
        setNote('');
        setIsRejectFallenModalOpen(false);
    };

    const rejectFallen = async (id) => {
        try {
            const response = await fetch('/api/reject-fallen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, note }),
            });

            const result = await response.json();

            if (result.success) {
                console.log(`The profile of ${result.data.firstName} ${result.data.lastName} has been rejected.`);
                setFilteredFallenData(prevData => prevData.map(fallen =>
                    fallen._id === id ? result.data : fallen
                ));
            } else {
                console.error('Error rejecting fallen:', data.error);
            }

        } catch (error) {
            console.error('Error:', error);
        }

        setSelectedProfileId('');
        setNote('');
        closeRejectFallenModal();
    }

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

    const editFallenProfile = async (formData) => {
        // TODO: Implement here the logic to edit the profile
        try {
            const response = await fetch("/api/update-fallen", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                console.log("Data updated successfully:", result.data);
                setFilteredFallenData(prevData =>
                    prevData.map(fallen =>
                        fallen._id === result.data._id ? result.data : fallen
                    )
                );
            } else {
                console.error("Failed to update data:", result.error);
            }
        } catch (error) {
            console.error("Error while updating data:", error);
        }

        closeEditFallenModal();
    };

    useEffect(() => {
        setFilteredFallenData(fallenData);
    }, [fallenData]);

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
                    {filteredFallenData.map((item, index) => (
                        <tr key={item._id}>
                            <td className={styles.date}>{item.createdAt ? item.createdAt.slice(0, 10) : 'תאריך לא זמין'}</td>

                            <td>{item.firstName} {item.lastName}</td>

                            <td>
                                <span className={`${styles.status} ${getStatusClass(item.status)}`}>
                                    {item.status}
                                </span>
                            </td>

                            <td className={styles.actions}>
                                <button
                                    type="button"
                                    onClick={() => approveFallen(item._id)}
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
                                    onClick={() => openRejectFallenModal(item._id)}
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
                isOpen={isRejectFallenModalOpen}
                onRequestClose={closeRejectFallenModal}
                contentLabel="דחיית פרופיל נופל"
                className={styles.modal}
                overlayClassName={styles.modalOverlay}
                ariaHideApp={false}
            >
                <button className={styles.closeButton} onClick={closeRejectFallenModal}>
                    <Image
                        src="/closeIcon.svg"
                        alt="Close icon"
                        width={20}
                        height={20}
                    />
                </button>

                <h2>דחיית פרופיל</h2>

                <label className={styles.fullWidthLabel}
                >
                    סיבת דחיה:
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </label>

                <button className={styles.applyButton} onClick={() => rejectFallen(selectedProfileId)}>דחיה</button>
            </Modal>

            <FallenForm isOpen={isEditFallenOpen} contentLabel={"עריכת נופל"} profile={selectedProfile} onSave={editFallenProfile} onCancel={closeEditFallenModal} />
        </>
    )
}
