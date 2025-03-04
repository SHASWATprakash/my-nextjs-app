// components/Carousel.js
import { useState, useRef, useEffect } from 'react';
import styles from '../styles/Carousel.module.css';

export default function Carousel() {
  const slides = [
    '/images/slide1.jpg',
    '/images/slide2.jpg',
    '/images/slide3.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!touchStartX.current) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX.current - currentX;
    if (diff > 50) {
      nextSlide();
      touchStartX.current = null;
    } else if (diff < -50) {
      prevSlide();
      touchStartX.current = null;
    }
  };

  return (
    <div
      className={styles.carouselContainer}
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <div className={styles.carouselSlide}>
        <img
          src={slides[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          loading="lazy"
        />
      </div>
      <button className={styles.prevButton} onClick={prevSlide} aria-label="Previous Slide">
        &lt;
      </button>
      <button className={styles.nextButton} onClick={nextSlide} aria-label="Next Slide">
        &gt;
      </button>
    </div>
  );
}
