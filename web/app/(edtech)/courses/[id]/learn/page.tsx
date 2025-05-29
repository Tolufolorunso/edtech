"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useCoursesStore } from "@/store/courses-store"
import { useLessonStore } from "@/store/lesson-store"
import { useAuthStore } from "@/store/auth-store"
import CourseNavigation from "@/components/courses/course-navigation"
import LessonContent from "@/components/courses/lesson-content"
import styles from "./learn.module.css"

export default function CourseLearnPage({ params }: { params: { id: string } }) {
  const courseId = params.id
  const router = useRouter()
  const { isAuthenticated } = useAuthStore()
  const { currentCourse, fetchCourseById } = useCoursesStore()
  const { lessons, fetchLessonsByCourse } = useLessonStore()
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(`/courses/${courseId}/learn`)}`)
      return
    }

    const loadCourseData = async () => {
      setIsLoading(true)
      await Promise.all([fetchCourseById(courseId), fetchLessonsByCourse(courseId)])
      setIsLoading(false)
    }

    loadCourseData()
  }, [courseId, isAuthenticated, router, fetchCourseById, fetchLessonsByCourse])

  useEffect(() => {
    // Set the first lesson as selected when lessons are loaded
    if (lessons.length > 0 && !selectedLessonId) {
      setSelectedLessonId(lessons[0]._id)
    }
  }, [lessons, selectedLessonId])

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLessonId(lessonId)
  }

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen)
  }

  const closeMobileNav = () => {
    setIsMobileNavOpen(false)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading course content...</div>
  }

  if (!currentCourse) {
    return <div className={styles.error}>Course not found</div>
  }

  return (
    <div className={styles.courseLearnPage}>
      <div className={styles.container}>
        <div className={styles.courseTitle}>
          <h1>{currentCourse.title}</h1>
        </div>

        <div className={styles.courseContent}>
          <CourseNavigation
            lessons={lessons}
            selectedLessonId={selectedLessonId}
            onLessonSelect={handleLessonSelect}
            isMobileNavOpen={isMobileNavOpen}
            onCloseMobileNav={closeMobileNav}
          />

          {selectedLessonId ? (
            <LessonContent lessonId={selectedLessonId} />
          ) : (
            <div className={styles.noLessonSelected}>
              <p>Select a lesson from the navigation to begin learning.</p>
            </div>
          )}
        </div>

        {/* Mobile navigation toggle button */}
        <button className={styles.mobileNavToggle} onClick={toggleMobileNav}>
          {isMobileNavOpen ? "Close" : "Lessons"}
        </button>
      </div>
    </div>
  )
}
