import styles from "./style.module.scss";
import { colorGenerator, toGrayscale } from "@/lib/colors";

const pastelColors = [
  "#FFF8F8", // Very Light Pink
  "#FEEDED", // Soft Peach
  "#FFFAFA", // Almost White Pink
  "#FEEBEB", // Muted Blush
  "#F2FFF0", // Pale Mint Green
  "#ECFAE2", // Soft Pastel Green
  "#EAF7FF", // Light Ice Blue
  "#F6F1FF", // Gentle Lavender
  "#FFF9E6", // Creamy Light Yellow
];

export default function DynamicBackground({
  children,
  rand,
  active = true,
  className = "",
}) {
  const randomColor = pastelColors[Math.floor(rand * pastelColors.length)];
  const baseColor = active ? randomColor : toGrayscale(randomColor);
  const lighterColor = active
    ? colorGenerator(randomColor, 50, "light")
    : toGrayscale(colorGenerator(randomColor, 50, "light"));
  const darkerBorderColor = active
    ? colorGenerator(randomColor, 10, "dark")
    : toGrayscale(colorGenerator(randomColor, 10, "dark"));

  return (
    <div
      className={`${styles.dynamicBackground} ${className}`}
      style={{
        "--baseColor": baseColor,
        "--lighterColor": lighterColor,
        "--borderColor": baseColor,
        "--darkerBorderColor": darkerBorderColor,
      }}
    >
      {children}
    </div>
  );
}
