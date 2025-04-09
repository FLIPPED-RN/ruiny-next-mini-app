'use client'

import styles from '@/styles/header.module.css';
import Image from 'next/image';

export default function Header() {
  const scrollToForm = () => {
    const formSection = document.getElementById('registration-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <Image
          src="/logo.png"
          alt="Логотип"
          width={60}
          height={0}
          className={styles.logo}
        />
        <div className={styles.burgerMenu}>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
          <div className={styles.burgerLine}></div>
        </div>
      </div>
      <div className={styles.headerContent}>
        <h1>Хранители руин</h1>
        <button onClick={scrollToForm}>Записаться</button>
      </div>
    </header>
  );
}