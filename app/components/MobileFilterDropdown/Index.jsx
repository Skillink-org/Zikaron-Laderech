"use client";

import React, { useState } from "react";
import HobbyTag from "../HobbyTag";
import styles from "./style.module.scss";

export default function MobileFilterDropdown({ 
  hobbies = [],
  isClickable = false
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <button 
        className={`${styles.dropdownButton} ${isDropdownOpen ? styles.active : ""}`}
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
        aria-controls="mobile-filter-dropdown"
      >
        סינון לפי תחביבים נפוצים
        <span className={styles.dropdownIcon}>
          {isDropdownOpen ? '▲' : '▼'}
        </span>
      </button>
      
      {isDropdownOpen && (
        <div 
          id="mobile-filter-dropdown"
          className={styles.dropdownContent}
        >
          {hobbies && hobbies.length > 0 && hobbies.map((hobby, index) => (
            <HobbyTag
              hobby={hobby._id}
              key={index}
              title={`${hobby.fallenCount} נופלים`}
              isClickable={isClickable}
            />
          ))}
        </div>
      )}
    </div>
  );
}