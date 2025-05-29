"use client"

import { useAuthStore } from "@/store/auth-store"
import type { Lesson } from "@/store/lesson-store"
import styles from "./course-navigation.module.css"

interface CourseNavigationProps {
  lessons: Lesson[]
  selectedLessonId: string | null
  onLessonSelect: (lessonId: string) => void
  isMobileNavOpen: boolean
  onCloseMobileNav: () => void
}

export default function CourseNavigation({
  lessons,
  selectedLessonId,
  onLessonSelect,
  isMobileNavOpen,
  onCloseMobileNav,
}: CourseNavigationProps) {
  const { isLessonCompleted } = useAuthStore()

  const handleLessonClick = (lessonId: string) => {
    onLessonSelect(lessonId)
    onCloseMobileNav() // Close mobile nav when a lesson is selected
  }

  if (lessons.length === 0) {
    return (
      <div
        className={`${styles.navigation} ${isMobileNavOpen ? `${styles.navigationMobile} ${styles.navigationMobileOpen}` : ""}`}
      >
        {isMobileNavOpen && (
          <div className={styles.navigationMobileHeader}>
            <h2>Course Content</h2>
            <button className={styles.closeButton} onClick={onCloseMobileNav}>
              ×
            </button>
          </div>
        )}
        <div className={styles.empty}>No lessons available</div>
      </div>
    )
  }

  return (
    <div
      className={`${styles.navigation} ${isMobileNavOpen ? `${styles.navigationMobile} ${styles.navigationMobileOpen}` : ""}`}
    >
      {isMobileNavOpen && (
        <div className={styles.navigationMobileHeader}>
          <h2>Course Content</h2>
          <button className={styles.closeButton} onClick={onCloseMobileNav}>
            ×
          </button>
        </div>
      )}
      <h2 className={styles.title}>Course Content</h2>
      <ul className={styles.lessonList}>
        {lessons.map((lesson) => {
          const isCompleted = isLessonCompleted(lesson._id)
          const isSelected = selectedLessonId === lesson._id

          return (
            <li
              key={lesson._id}
              className={`${styles.lessonItem} ${isSelected ? styles.selected : ""} ${isCompleted ? styles.completed : ""}`}
              onClick={() => handleLessonClick(lesson._id)}
            >
              <div className={styles.lessonNumber}>{lesson.position}</div>
              <div className={styles.lessonInfo}>
                <h3 className={styles.lessonTitle}>{lesson.title}</h3>
                {isCompleted && <span className={styles.completedBadge}>✓</span>}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
