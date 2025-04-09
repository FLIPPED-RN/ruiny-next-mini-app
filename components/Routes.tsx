'use client'

import { useState } from 'react';
import styles from '@/styles/routes.module.css';
import Image from 'next/image';
import RouteDetails from './RouteDetails';

type Route = {
  id: number;
  title: string;
  startPoint: string;
  endPoint: string;
  date: string;
  image: string;
  description?: string;
};

type RouteCategory = 'short' | 'medium' | 'long';

const routesData: Record<RouteCategory, Route[]> = {
  short: [
    {
      id: 1,
      title: 'Прогулка',
      startPoint: 'Бухта Айя',
      endPoint: 'Бухта Айя',
      date: '12 апреля',
      image: '/images/route1.png',
      description: 'Красивая прогулка по живописным местам бухты Айя. Идеально подходит для новичков. Маршрут проходит вдоль побережья с посещением смотровых площадок и купанием в кристально чистой воде. Продолжительность: 2 часа. Уровень сложности: легкий.',
    },
    {
      id: 2,
      title: 'Прогулка',
      startPoint: 'Бухта Айя',
      endPoint: 'Бухта Айя',
      date: '12 апреля',
      image: '/images/route2.png',
      description: 'Короткий маршрут вдоль побережья с великолепными видами на море. Подходит для семей с детьми и пожилых людей. По пути вы увидите живописные скалы и гроты. Продолжительность: 1.5 часа. Уровень сложности: очень легкий.',
    },
  ],
  medium: [
    {
      id: 3,
      title: 'Прогулка',
      startPoint: 'Бухта Айя',
      endPoint: 'Мыс Фиолент',
      date: '15 апреля',
      image: '/images/route1.png',
      description: 'Маршрут средней сложности с разнообразными пейзажами и местами для отдыха. Вы пройдете через сосновый лес и спуститесь к диким пляжам. На пути встретятся исторические достопримечательности. Продолжительность: 4 часа. Уровень сложности: средний.',
    },
  ],
  long: [
    {
      id: 4,
      title: 'Прогулка',
      startPoint: 'Бухта Айя',
      endPoint: 'Балаклава',
      date: '20 апреля',
      image: '/images/route2.png',
      description: 'Длинный маршрут для опытных туристов с потрясающими видами и дикой природой. Проходит по горной местности с перепадами высот. Вы увидите древние руины, водопады и панорамные виды на Черное море. Продолжительность: 6-7 часов. Уровень сложности: высокий.',
    },
  ],
};

export default function Routes() {
  const [activeCategory, setActiveCategory] = useState<RouteCategory>('short');
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  const handleShowDetails = (route: Route) => {
    setSelectedRoute(route);
  };

  const handleCloseDetails = () => {
    setSelectedRoute(null);
  };

  return (
    <div className={styles.routes}>
      <div className={styles.routeTabs}>
        <button 
          className={`${styles.tabButton} ${activeCategory === 'short' ? styles.active : ''}`}
          onClick={() => setActiveCategory('short')}
        >
          Короткие
        </button>
        <button 
          className={`${styles.tabButton} ${activeCategory === 'medium' ? styles.active : ''}`}
          onClick={() => setActiveCategory('medium')}
        >
          Средние
        </button>
        <button 
          className={`${styles.tabButton} ${activeCategory === 'long' ? styles.active : ''}`}
          onClick={() => setActiveCategory('long')}
        >
          Длинные
        </button>
      </div>

      <div className={styles.routeCards}>
        {routesData[activeCategory].map((route) => (
          <div key={route.id} className={styles.routeCard}>
            <div className={styles.cardImage}>
              <Image
                src={'/images/one.png'}
                alt={route.title}
                width={300}
                height={200}
                className={styles.routeImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.routeTitle}>{route.title}</h3>
              <p className={styles.routeInfo}>Начало: {route.startPoint}</p>
              <p className={styles.routeInfo}>Конец: {route.endPoint}</p>
              <button 
                className={styles.detailsButton}
                onClick={() => handleShowDetails(route)}
              >
                Подробнее
              </button>
              <p className={styles.routeDate}>Дата: {route.date}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedRoute && (
        <RouteDetails
          id={selectedRoute.id}
          title={selectedRoute.title}
          startPoint={selectedRoute.startPoint}
          endPoint={selectedRoute.endPoint}
          date={selectedRoute.date}
          image={'/images/one.png'}
          description={selectedRoute.description || ''}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
} 