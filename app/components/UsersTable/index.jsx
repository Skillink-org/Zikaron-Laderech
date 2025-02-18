"use client";

import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from './style.module.scss'

import Image from "next/image"

import StatusMessage from "../StatusMessage";

export default function UsersTable({ usersData }) {
    const [filteredUsersData, setFilteredUsersData] = useState(usersData);
    const [searchQuery, setSearchQuery] = useState('');
    const [role, setRole] = useState('');
    const [previousRole, setPreviousRole] = useState('');

    const filterData = (searchQuery, role) => {
        let filteredData = [...usersData];

        if (role !== "") {
            filteredData = filteredData.filter(item => item.role === role);
        }

        if (searchQuery !== "") {
            filteredData = filteredData.filter(item => {
                const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
                return fullName.includes(searchQuery.trim());
            });
        }

        setFilteredUsersData(filteredData);
    };

    function handleChange(e) {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        filterData(query, role);
    }

    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setRole(previousRole);
        setIsOpen(false);
    };

    const handleRoleChange = (e) => {
        setPreviousRole(role);
        setRole(e.target.value);
    };

    const applyFilter = () => {
        filterData(searchQuery, role);

        closeModal();
    };

    const getRoleClass = (role) => {
        switch (role) {
            case "admin":
                return styles.admin;
            case "user":
                return styles.user;
            default:
                return "";
        }
    };

    const [statusMessage, setStatusMessage] = useState("");
    const [statusType, setStatusType] = useState("");

    const changeRole = async (id) => {
        try {
            const response = await fetch('/api/change-role', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id })
            });

            const result = await response.json();

            if (result.success) {
                console.log(`The role of ${result.data.firstName} ${result.data.lastName} has been updated.`);
                setFilteredUsersData(prevData => prevData.map(user =>
                    user._id === id ? result.data : user
                ));
                setStatusMessage(`ההרשאה של ${result.data.firstName} ${result.data.lastName} עודכנה בהצלחה`);
                setStatusType("success");
            } else {
                console.error("Approval failed:", result.error);
                setStatusMessage("עדכון ההרשאה נכשל");
                setStatusType("error");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setStatusMessage("עדכון ההרשאה נכשל");
            setStatusType("error");
        }
        setTimeout(() => {
            setStatusMessage("");
            setStatusType("");
        }, 10000);
    };

    useEffect(() => {
        setFilteredUsersData(usersData);
    }, [usersData]);

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
                        placeholder=" חיפוש לפי שם של משתמש..."
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
                    contentLabel="סינון משתמשים"
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

                    <h2>סינון משתמשים</h2>

                    <label htmlFor="role">הרשאה:</label>
                    <select id="role" value={role} onChange={handleRoleChange}>
                        <option value="">הכל</option>
                        <option value="admin">מנהל</option>
                        <option value="user">משתמש</option>
                    </select>

                    <button className={styles.applyButton} onClick={applyFilter}>החל סינון</button>
                </Modal>
            </div>

            <table className={styles.usersTable}>
                <thead>
                    <tr>
                        <th>שם משתמש</th>
                        <th>כתובת דוא"ל</th>
                        <th>הרשאה</th>
                        <th>שינוי הרשאה</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsersData.map((item, index) => (
                        <tr key={item._id}>
                            <td>{item.firstName} {item.lastName}</td>

                            <td>{item.email}</td>

                            <td>
                                <span className={`${styles.role} ${getRoleClass(item.role)}`}>
                                    {item.role === "admin" ? "מנהל" : "משתמש"}
                                </span>
                            </td>

                            <td className={styles.action}>
                                <button
                                    type="button"
                                    onClick={() => changeRole(item._id)}
                                >
                                    <Image
                                        src="/keyIcon.svg"
                                        alt="Key icon"
                                        width={20}
                                        height={20}
                                    />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {statusMessage && (
                <div className={styles.statusMessage}>
                    <StatusMessage message={statusMessage} type={statusType} />
                </div>
            )}

        </>
    )
}
