import React from 'react'
import styles from './style.module.scss'
import Button from '../Button/Button';

export default function LargeBubble({ title, subtitle, buttonText, onButtonClick }) {
    return (
      <div className={styles.largeBubble}>
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
         <Button children={buttonText} onClick={onButtonClick} />
        </div>
      </div>
    );
  }

