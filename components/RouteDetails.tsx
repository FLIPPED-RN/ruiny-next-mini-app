'use client'

import styles from '@/styles/routeDetails.module.css';
import Image from 'next/image';

type RouteDetailsProps = {
  id: number;
  title: string;
  startPoint: string;
  endPoint: string;
  date: string;
  image: string;
  description: string;
  onClose: () => void;
};

export default function RouteDetails({
  title,
  startPoint,
  endPoint,
  date,
  image,
  description,
  onClose
}: RouteDetailsProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <div className={styles.modalContent}>
          <div className={styles.imageContainer}>
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'cover' }}
              className={styles.routeImage}
            />
          </div>
          
          <div className={styles.details}>
            <h2 className={styles.title}>{title}</h2>
            
            <div className={styles.info}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Начало:</span>
                <span className={styles.value}>{startPoint}</span>
              </div>
              
              <div className={styles.infoItem}>
                <span className={styles.label}>Конец:</span>
                <span className={styles.value}>{endPoint}</span>
              </div>
              
              <div className={styles.infoItem}>
                <span className={styles.label}>Дата:</span>
                <span className={styles.value}>{date}</span>
              </div>
            </div>
            
            <div className={styles.description}>
              <h3>Описание маршрута</h3>
              <p>{description}</p>
            </div>
            
            <div className={styles.actions}>
              <button className={styles.bookButton}>
                Записаться на прогулку
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 