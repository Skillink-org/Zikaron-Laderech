 "use client"
import React from 'react';
import styles from './page.module.scss';  
import CustomBubble from '../components/CustomBubble';
import LargeBubble from '../components/LargeBubble';

export default function AboutPage() {
  const handleJoinClick = () => {
    
  };

  return (
    <div className={styles.page}>
      <div className={styles.imageWithTitle}>
        <h1 className={styles.title}>אודות המיזם</h1>
        <p className={styles.subtitle}>תיאור קצר על מטרת המיזם</p>
      </div>

      <CustomBubble style={{ marginBottom: '20px' }}>
        <p>סיפור המיזם: כאן נכנס תיאור המיזם בצורה מסודרת.</p>
      </CustomBubble>

      <div className={styles.bubbles}>
        <CustomBubble>
          <h3>כותרת בועה 1</h3>
          <p>תוכן בועה 1</p>
        </CustomBubble>
        <CustomBubble>
          <h3>כותרת בועה 2</h3>
          <p>תוכן בועה 2</p>
        </CustomBubble>
        <CustomBubble>
          <h3>כותרת בועה 3</h3>
          <p>תוכן בועה 3</p>
        </CustomBubble>
      </div>

      <LargeBubble
        title="הצטרפו להנצחה"
        subtitle="הצטרפו אלינו והיו חלק מההצלחה"
        buttonText="הצטרף עכשיו"
        onButtonClick={handleJoinClick}
      />
    </div>
  );
}
