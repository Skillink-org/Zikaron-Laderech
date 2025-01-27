import Image from "next/image";
import styles from "./style.module.scss";

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
  "#E7FFAC", // Yellow-green
];
// Function to create a color by type
const colorGenrator = (color, percent, type = "light") => {
  const factor = type === "light" ? [1, 1] : [-1, 0];

  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + factor[0] * amt;
  const G = ((num >> 8) & 0x00ff) + factor[0] * amt;
  const B = (num & 0x0000ff) + factor[0] * amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < factor[1] ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < factor[1] ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < factor[1] ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

export default function HobbyBubble({
  children = "טניס",
  plusMode = true,
  onClick,
}) {
  const randomColor =
    pastelColors[Math.floor(Math.random() * pastelColors.length)]; // Pick a random color from the list
  const lighterColor = colorGenrator(randomColor, 50, "light"); // Generate a lighter version of the random color
  const darkerBorderColor = colorGenrator(randomColor, 20, "dark"); // Generate a darker border color

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
      {children}
      {plusMode ? (
        <Image
          src="/plusIcon.svg"
          alt="Plus icon"
          className={styles.Image}
          width={20}
          height={20}
        />
      ) : (
        ""
      )}
    </div>
  );
}
