"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCoursesStore } from "@/store/courses-store"
import { useTracksStore } from "@/store/tracks-store"
import { useAuthStore } from "@/store/auth-store"
import { useEnrollmentStore } from "@/store/enrollment-store"
import type { Track } from "@/store/tracks-store"
import styles from "./course-details.module.css"

export default function CourseDetails({ courseId }: { courseId: string }) {
  const router = useRouter()
  const { currentCourse, isLoading: isCourseLoading, error: courseError, fetchCourseById } = useCoursesStore()
  const { tracks, fetchTracks } = useTracksStore()
  const { isAuthenticated } = useAuthStore()
  const {
    enrollInCourse,
    isEnrolledInCourse,
    isLoading: isEnrollmentLoading,
    error: enrollmentError,
  } = useEnrollmentStore()

  const [courseTracks, setCourseTracks] = useState<Track[]>([])
  const [isTracksLoading, setIsTracksLoading] = useState(false)

  const isEnrolled = isEnrolledInCourse(courseId)

  useEffect(() => {
    fetchCourseById(courseId)
    fetchTracks()
  }, [courseId, fetchCourseById, fetchTracks])

  useEffect(() => {
    const loadCourseTracks = async () => {
      if (currentCourse) {
        setIsTracksLoading(true)
        try {
          // Filter tracks that this course belongs to
          const filteredTracks = tracks.filter((track) => currentCourse.tracks.includes(track._id))
          setCourseTracks(filteredTracks)
        } catch (error) {
          console.error("Failed to load course tracks:", error)
        } finally {
          setIsTracksLoading(false)
        }
      }
    }

    loadCourseTracks()
  }, [currentCourse, tracks])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(`/courses/${courseId}`))
      return
    }

    await enrollInCourse(courseId)
  }

  const handleStartLearning = () => {
    router.push(`/courses/${courseId}/learn`)
  }

  if (isCourseLoading) {
    return <div className={styles.loading}>Loading course details...</div>
  }

  if (courseError) {
    return <div className={styles.error}>Error: {courseError}</div>
  }

  if (!currentCourse) {
    return <div className={styles.error}>Course not found</div>
  }

  return (
    <div className={styles.courseDetails}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{currentCourse.title}</h1>
          <p className={styles.description}>{currentCourse.description}</p>

          <div className={styles.instructor}>
            <Image
              src={currentCourse.instructor.avatar || "/placeholder.svg?height=60&width=60"}
              alt={currentCourse.instructor.name}
              width={60}
              height={60}
              className={styles.avatar}
            />
            <div>
              <p className={styles.instructorLabel}>Instructor</p>
              <p className={styles.instructorName}>{currentCourse.instructor.name}</p>
            </div>
          </div>

          {!isEnrolled ? (
            <button className={styles.enrollButton} onClick={handleEnroll} disabled={isEnrollmentLoading}>
              {isEnrollmentLoading
                ? "Enrolling..."
                : `Enroll in Course${currentCourse.isPremium ? " (Premium)" : " (Free)"}`}
            </button>
          ) : (
            <div className={styles.enrolledActions}>
              <div className={styles.enrolledBadge}>
                <span>✓</span> Enrolled
              </div>
              <button className={styles.startLearningButton} onClick={handleStartLearning}>
                Start Learning
              </button>
            </div>
          )}

          {enrollmentError && <div className={styles.enrollmentError}>{enrollmentError}</div>}
        </div>
        <div className={styles.headerImage}>
          <Image
            src={
              currentCourse.thumbnail ||
              `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(currentCourse.title) || "/placeholder.svg"}`
            }
            alt={currentCourse.title}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
      </div>

      {courseTracks.length > 0 && (
        <div className={styles.tracksSection}>
          <h2>This Course is Part of These Tracks</h2>

          {isTracksLoading ? (
            <div className={styles.loading}>Loading tracks...</div>
          ) : (
            <div className={styles.tracksList}>
              {courseTracks.map((track) => (
                <Link key={track._id} href={`/tracks/${track._id}`} className={styles.trackCard}>
                  <h3>{track.title}</h3>
                  <p>{track.description}</p>
                  <span className={styles.viewTrack}>View Track →</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.contentSection}>
        <h2>Course Content</h2>
        <div className={styles.contentPreview}>
          <p>This course includes:</p>
          <ul className={styles.contentList}>
            <li>Video lectures</li>
            <li>Downloadable resources</li>
            <li>Practical assignments</li>
            <li>Quizzes to test your knowledge</li>
          </ul>
          {isEnrolled ? (
            <button className={styles.startLearningButton} onClick={handleStartLearning}>
              Continue to Course Content
            </button>
          ) : (
            <p className={styles.enrollPrompt}>Enroll now to access all course content!</p>
          )}
        </div>
      </div>
    </div>
  )
}
