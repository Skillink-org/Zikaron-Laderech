/**
 * This component is used to create a customizable background wrapper.
 * It allows setting a specific width and height for various use cases.
 *
 * Example usage:
 * <CustomBubble style={{ width: '500px', height: 'auto' }}>
 *   Text
 * </CustomBubble>
 */

'use client'
import React from 'react';
import styles from './style.module.scss';

const CustomBubble = ({ children, className = '', style = {}, onClick, ...props }) => {
  return (
    <div className={`${styles.customBubble} ${className}`} style={style} onClick={onClick} {...props}>
      {children}
    </div>
  );
}

export default CustomBubble;
