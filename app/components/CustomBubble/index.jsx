/**
 * This component is used to create a customizable background wrapper.
 * It allows setting a specific width and height for various use cases.
 *
 * Example usage:
 * <CustomBubble style={{ width: '500px', height: 'auto' }}>
 *   Text
 * </CustomBubble>
 */
import React from 'react';
import styles from './style.module.scss';

const CustomBubble = ({ children, className = '', style = {} }) => {
  return (
    <div className={`${styles.customBubble} ${className}`} style={style}>
      {children}
    </div>
  );
};

export default CustomBubble;
