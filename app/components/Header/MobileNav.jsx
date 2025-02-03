"use client";

import Image from "next/image";
import styles from "./style.module.scss";
import { useState } from "react";
import NavList from "./NavList";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <div
      className={`${styles.mobileNav} ${isOpen ? styles.open : styles.closed}`}
    >
      <Image
        src="/mobile-nav-icon.svg"
        className={styles.navIcon}
        width={26}
        height={26}
        alt="Mobile nav icon"
        onClick={toggleNav}
      />
      <NavList />
    </div>
  );
}
