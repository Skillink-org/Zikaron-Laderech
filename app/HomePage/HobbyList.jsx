import React from 'react';
import styles from './style.module.scss';

    
const hobbies = [
    { text: "שחיה", baseColor: "#cce7ff", lighterColor: "#e6f3ff" },
    { text: "סריגה", baseColor: "#e5ccff", lighterColor: "#f3e6ff" },
    { text: "אפיה", baseColor: "#ccd9ff", lighterColor: "#e6ecff" },
    { text: "ריצה", baseColor: "#ffe5cc", lighterColor: "#fff3e6" },
    { text: "שירה", baseColor: "#ffcccc", lighterColor: "#ffe6e6" },
    { text: "טניס", baseColor: "#ccffcc", lighterColor: "#e6ffe6" },
  ];
  
  export default function HobbyList() {
    return (
      <div className={styles.hobbyContainer}>
        {hobbies.map((hobby, index) => (
          <div
            key={index}
            className={styles.hobbyBubble}
            style={{
              "--baseColor": hobby.baseColor,
              "--lighterColor": hobby.lighterColor,
            }}
          >
            {hobby.text}
          </div>
        ))}
      </div>
    );
  }