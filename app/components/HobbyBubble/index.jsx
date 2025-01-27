import React from 'react';
import Image from 'next/image';
import styles from './style.module.scss';

export default function HobbyBubble({ hobby = "טניס", plusMode = true, onClick, ...props }) {

    // List of pastel colors
    const pastelColors = [
        "#FFB3BA", // Light pink
        "#FFDFBA", // Light orange
        "#FFFFBA", // Light yellow
        "#B9FBC0", // Light green
        "#BAE1FF", // Light blue
        "#D3BFFF", // Light purple
        "#FFABE1", // Light rose
        "#FFC6FF", // Lavender
        "#CFFAFF", // Light turquoise
        "#E7FFAC"  // Yellow-green
    ];

    // Pick a random color from the list
    const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];

    // Function to create a lighter version of a color
    const lightenColor = (color, percent) => {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) + amt,
            G = ((num >> 8) & 0x00ff) + amt,
            B = (num & 0x0000ff) + amt;
        return (
            "#" +
            (0x1000000 +
                (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 1 ? 0 : B) : 255))
                .toString(16)
                .slice(1)
        );
    };

    // Generate a lighter version of the random color
    const lighterColor = lightenColor(randomColor, 50);

    // Function to darken a color
    const darkenColor = (color, percent) => {
        const num = parseInt(color.replace("#", ""), 16),
            amt = Math.round(2.55 * percent),
            R = (num >> 16) - amt,
            G = ((num >> 8) & 0x00ff) - amt,
            B = (num & 0x0000ff) - amt;
        return (
            "#" +
            (0x1000000 +
                (R < 255 ? (R < 0 ? 0 : R) : 255) * 0x10000 +
                (G < 255 ? (G < 0 ? 0 : G) : 255) * 0x100 +
                (B < 255 ? (B < 0 ? 0 : B) : 255))
                .toString(16)
                .slice(1)
        );
    };

    // Generate a darker border color
    const darkerBorderColor = darkenColor(randomColor, 20);

    return (
        <div
            className={styles.hobbyBubble}
            style={{
                "--baseColor": randomColor,
                "--lighterColor": lighterColor,
                "--borderColor": randomColor,
                "--darkerBorderColor": darkerBorderColor,
            }}
            onClick={onClick}
        >
            {hobby}
           {plusMode ? <Image src="/plusIcon.svg" alt="Plus icon" className={styles.Image} width={20} height={20} />:""}
        </div>
    );
}
