export const colorGenerator = (color, percent, type = "light") => {
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

export const toGrayscale = (color) => {
  const num = parseInt(color.replace("#", ""), 16);
  const R = (num >> 16) & 0xff;
  const G = (num >> 8) & 0xff;
  const B = num & 0xff;
  const gray = Math.round(0.3 * R + 0.59 * G + 0.11 * B); // Standard grayscale formula
  return `#${gray.toString(16).padStart(2, "0").repeat(3)}`;
};
