// components/Roadmap.js
import { useState, useEffect } from 'react';
import styles from '../styles/Roadmap.module.css';
import { useRouter } from 'next/router';

export default function Roadmap() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const lessons = [
    { id: 1, title: 'Introduction to Python', link: '/course/python-intro' },
    { id: 2, title: 'How to Learn Python Step by Step', link: '/course/python-step' },
    { id: 3, title: 'Complete Tutorial: Learn Data Python from Scratch', link: '/course/python-data' }
  ];

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('roadmapProgress');
    if (savedProgress) {
      setProgress(Number(savedProgress));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('roadmapProgress', progress.toString());
  }, [progress]);

  const handleLessonClick = (lessonIndex, link) => {
    setProgress(lessonIndex);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      router.push(link);
    }, 1500);
  };

  return (
    <div className={styles.roadmapContainer}>
      <h2>Interactive Roadmap</h2>
      <div className={styles.roadmap}>
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`${styles.lessonCircle} ${index <= progress ? styles.completed : ''}`}
            onClick={() => handleLessonClick(index, lesson.link)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLessonClick(index, lesson.link)}
            aria-label={`Lesson: ${lesson.title}`}
          >
            <span>{index + 1}</span>
          </div>
        ))}
      </div>

      <div
        className={styles.avatar}
        style={{ top: `${progress * 80}px` }}
        aria-label="Avatar indicating current progress"
      >
        <img
          src="https://via.placeholder.com/40/ffffff/000000?text=AV"
          alt="Avatar"
        />
      </div>

      {showToast && (
        <div className="toast">
          <p>Navigating to lesson...</p>
        </div>
      )}
    </div>
  );
}
