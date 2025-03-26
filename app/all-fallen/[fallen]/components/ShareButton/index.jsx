'use client';

import { useState } from 'react';
import Button from '@/app/components/Button';
import styles from './style.module.scss';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Button onClick={handleShare} className={styles.button}>
      {copied ? 'הלינק הועתק!' : 'שיתוף'}
    </Button>
  );
}