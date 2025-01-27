/**
 * This component is used to create a customizable background wrapper.
 * It allows setting a specific width and height for various use cases.
 *
 * Example usage:
 * <CustomBubble style={{ width: '500px', height: 'auto' }}>
 *   Text
 * </CustomBubble>
 */
import styles from "./style.module.scss";

export default function CustomBubble({
  children,
  classNames = "",
  style = {},
  onClick,
}) {
  return (
    <div
      className={`${styles.customBubble} ${classNames}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
