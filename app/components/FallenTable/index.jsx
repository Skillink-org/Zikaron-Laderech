"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from './style.module.scss';
import Image from "next/image";
import FallenForm from "../FallenForm";
import StatusMessage from "../StatusMessage";
import Pagination from "../Pagination";
import {getAllFallen, getFilteredFallenByNameAndStatus, approveFallen, rejectFallen, updateFallenById } from "@/server/actions/fallen.action";
import { uploadImage } from "@/server/actions/uploadImage.action";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function FallenTable() {
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState("all");
    const [previousStatus, setPreviousStatus] = useState('');
    const [actionStates, setActionStates] = useState({});

    const [data, setData] = useState([]);
    const currentPage = Number(searchParams.get("page")) || 1;
    const [totalPages, setTotalPages] = useState(0);
    const limit = 10;
    const skip = (currentPage - 1) * limit;

    const fetchData = async () => {
        const response = searchQuery
            ? await getFilteredFallenByNameAndStatus(searchQuery, limit, skip, status)
            : await getAllFallen(limit, skip, status);

        const sortedData = [...response.data].sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`;
            const nameB = `${b.firstName} ${b.lastName}`;

            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setData(sortedData);

        setTotalPages(Math.ceil(response.total / limit));
    };

    const debouncedFetchData = useDebouncedCallback(() => {
        fetchData();
    }, 500);

    useEffect(() => {
        debouncedFetchData();
    }, []);

    const [sortOrder, setSortOrder] = useState('asc');
    const sortData = () => {
        const sortedData = [...data].sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`;
            const nameB = `${b.firstName} ${b.lastName}`;

            if (nameA < nameB) return sortOrder === 'asc' ? -1 : 1;
            if (nameA > nameB) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
        setData(sortedData);
    };

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        sortData();
    };

    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
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
        setIsOpen(false);
    };

    useEffect(() => {
        debouncedFetchData();
    }, [searchQuery, status, currentPage]);

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

    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const approveFallenById = async (id) => {
        try {
            setActionStates(prev => ({
                ...prev,
                [id]: { ...prev[id], isProcessing: true }
            }));

            const approvedFallen = await approveFallen(id);

            if (approvedFallen) {
                console.log(`The profile ${approvedFallen.firstName} ${approvedFallen.lastName} has been approved.`);
                
                setData(prevData => prevData.map(fallen =>
                    fallen._id === id ? { ...fallen, status: "approved" } : fallen
                ));
                
                setStatusMessage("הפרופיל אושר בהצלחה");
                setStatusType("success");
                
                setActionStates(prev => ({
                    ...prev,
                    [id]: { isProcessing: false, isCompleted: true, action: 'approved' }
                }));
            } else {
                console.error("Approval failed");
                setStatusMessage("אישור הפרופיל נכשל");
                setStatusType("error");
                
                setActionStates(prev => ({
                    ...prev,
                    [id]: { isProcessing: false }
                }));
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setStatusMessage("אישור הפרופיל נכשל");
            setStatusType("error");
            
            setActionStates(prev => ({
                ...prev,
                [id]: { isProcessing: false }
            }));
        }

        setTimeout(() => {
            setStatusMessage("");
            setStatusType("");
        }, 10000);
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

    const rejectFallenById = async (id) => {
        try {
            setActionStates(prev => ({
                ...prev,
                [id]: { ...prev[id], isProcessing: true }
            }));

            const rejectedFallen = await rejectFallen(id, note);

            if (rejectedFallen) {
                console.log(`The profile of ${rejectedFallen.firstName} ${rejectedFallen.lastName} has been rejected.`);
                
                setData(prevData => prevData.map(fallen =>
                    fallen._id === id ? { ...fallen, status: "rejected" } : fallen
                ));
                
                setStatusMessage("הפרופיל נדחה בהצלחה");
                setStatusType("success");
                
                setActionStates(prev => ({
                    ...prev,
                    [id]: { isProcessing: false, isCompleted: true, action: 'rejected' }
                }));
            } else {
                console.error('Error rejecting fallen');
                setStatusMessage("דחיית הפרופיל נכשלה");
                setStatusType("error");
                
                setActionStates(prev => ({
                    ...prev,
                    [id]: { isProcessing: false }
                }));
            }
        } catch (error) {
            console.error('Error:', error);
            setStatusMessage("דחיית הפרופיל נכשלה");
            setStatusType("error");
            
            setActionStates(prev => ({
                ...prev,
                [id]: { isProcessing: false }
            }));
        }

        setSelectedProfileId('');
        setNote('');
        closeRejectFallenModal();

        setTimeout(() => {
            setStatusMessage("");
            setStatusType("");
        }, 10000);
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

    const editFallenProfile = async (formData) => {
        try {
            const jsonString = formData.get('data');
            if (!jsonString) {
                throw new Error("Missing data payload.");
            }

            const data = JSON.parse(jsonString);

            const file = formData.get('image');
            if (file) {
                const imageFormData = new FormData();
                imageFormData.append("image", file);

                const imageUrl = await uploadImage(imageFormData);

                data.imageUrl = imageUrl;
            }

            const updatedFallen = await updateFallenById(data);

            if (updatedFallen) {
                console.log("Data updated successfully:", updatedFallen);
                setData(prevData =>
                    prevData.map(fallenItem =>
                        fallenItem._id === data._id ? updatedFallen : fallenItem
                    )
                );
            } else {
                console.error("Failed to update data.");
            }
        } catch (error) {
            console.error("Error while updating data:", error);
        }

        closeEditFallenModal();
    };

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

                <button
                    type="button"
                    className={styles.filterButton}
                    onClick={toggleSortOrder}
                >
                    {sortOrder === 'asc' ?
                        <Image
                            src="/upArrow.svg"
                            alt="Sort Ascending"
                            width={24}
                            height={24}
                        />
                        :
                        <Image
                            src="/downArrow.svg"
                            alt="Sort Descending"
                            width={24}
                            height={24}
                        />
                    }
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
                        <option value="all">הכל</option>
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
                    {data.length > 0 ?
                        data.map((item, index) => (
                            <tr key={item._id}>
                                <td className={styles.date}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('he-IL')  : 'תאריך לא זמין'}</td>

                                <td>{item.firstName} {item.lastName}</td>

                                <td>
                                    <span className={`${styles.status} ${getStatusClass(item.status)}`}>
                                        {item.status === "pending" ? "ממתין לאישור" : item.status === "approved" ? "מאושר" : "נדחה"}
                                    </span>
                                </td>

                                <td className={styles.actions}>
                                    <button
                                        type="button"
                                        onClick={() => approveFallenById(item._id)}
                                        disabled={actionStates[item._id]?.isProcessing || item.status === "approved"}
                                        className={`${styles.actionButton} ${item.status === "approved" ? styles.completed : ""}`}
                                    >
                                        {actionStates[item._id]?.isProcessing ? (
                                            <div className={styles.loadingSpinner}></div>
                                        ) : item.status === "approved" ? (
                                            <div className={styles.approvedIcon}>✓</div>
                                        ) : (
                                            <Image
                                                src="/approveIcon.svg"
                                                alt="Approve icon"
                                                width={20}
                                                height={20}
                                            />
                                        )}
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
                                        disabled={actionStates[item._id]?.isProcessing || item.status === "rejected"}
                                        className={`${styles.actionButton} ${item.status === "rejected" ? styles.completed : ""}`}
                                    >
                                        {actionStates[item._id]?.isProcessing ? (
                                            <div className={styles.loadingSpinner}></div>
                                        ) : item.status === "rejected" ? (
                                            <div className={styles.rejectedIcon}>✕</div>
                                        ) : (
                                            <Image
                                                src="/rejectIcon.svg"
                                                alt="Reject icon"
                                                width={20}
                                                height={20}
                                            />
                                        )}
                                    </button>
                                </td>
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan="4" >
                                <StatusMessage 
                                    message="לא נמצאו נופלים התואמים את החיפוש"
                                    type="error"
                                />
                            </td>
                        </tr>
                    }
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalPages={totalPages} />

            {statusMessage && (
                <div className={styles.statusMessage}>
                    <StatusMessage message={statusMessage} type={statusType} mode="toast" />
                </div>
            )}

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

                <label className={styles.fullWidthLabel}>
                    סיבת דחיה:
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </label>

                <button className={styles.applyButton} onClick={() => rejectFallenById(selectedProfileId)}>דחיה</button>
            </Modal>

            <FallenForm isOpen={isEditFallenOpen} contentLabel={"עריכת נופל"} profile={selectedProfile} onSave={editFallenProfile} onCancel={closeEditFallenModal} />
        </>
    );
}