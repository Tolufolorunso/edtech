"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useTracksStore } from "@/store/tracks-store"
import { useCoursesStore } from "@/store/courses-store"
import { useAuthStore } from "@/store/auth-store"
import { useEnrollmentStore } from "@/store/enrollment-store"
import type { Course } from "@/store/courses-store"
import styles from "./track-details.module.css"

export default function TrackDetails({ trackId }: { trackId: string }) {
  const router = useRouter()
  const { currentTrack, isLoading: isTrackLoading, error: trackError, fetchTrackById } = useTracksStore()
  const { courses, fetchCourses } = useCoursesStore()
  const { isAuthenticated } = useAuthStore()
  const {
    enrollInTrack,
    isEnrolledInTrack,
    isLoading: isEnrollmentLoading,
    error: enrollmentError,
  } = useEnrollmentStore()

  const [trackCourses, setTrackCourses] = useState<Course[]>([])
  const [isCoursesLoading, setIsCoursesLoading] = useState(false)

  const isEnrolled = isEnrolledInTrack(trackId)

  useEffect(() => {
    fetchTrackById(trackId)
    fetchCourses()
  }, [trackId, fetchTrackById, fetchCourses])

  useEffect(() => {
    const loadTrackCourses = async () => {
      if (currentTrack) {
        setIsCoursesLoading(true)
        try {
          // Filter courses that belong to this track
          const filteredCourses = courses.filter((course) => course.tracks.includes(trackId))
          setTrackCourses(filteredCourses)
        } catch (error) {
          console.error("Failed to load track courses:", error)
        } finally {
          setIsCoursesLoading(false)
        }
      }
    }

    loadTrackCourses()
  }, [currentTrack, trackId, courses])

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      router.push("/login?redirect=" + encodeURIComponent(`/tracks/${trackId}`))
      return
    }

    await enrollInTrack(trackId)
  }

  if (isTrackLoading) {
    return <div className={styles.loading}>Loading track details...</div>
  }

  if (trackError) {
    return <div className={styles.error}>Error: {trackError}</div>
  }

  if (!currentTrack) {
    return <div className={styles.error}>Track not found</div>
  }

  return (
    <div className={styles.trackDetails}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>{currentTrack.title}</h1>
          <p className={styles.description}>{currentTrack.description}</p>

          {!isEnrolled ? (
            <button className={styles.enrollButton} onClick={handleEnroll} disabled={isEnrollmentLoading}>
              {isEnrollmentLoading ? "Enrolling..." : "Enroll in Track"}
            </button>
          ) : (
            <div className={styles.enrolledBadge}>
              <span>✓</span> Enrolled
            </div>
          )}

          {enrollmentError && <div className={styles.enrollmentError}>{enrollmentError}</div>}
        </div>
        <div className={styles.headerImage}>
          <Image
            src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(currentTrack.title)}`}
            alt={currentTrack.title}
            width={600}
            height={400}
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.coursesSection}>
        <h2>Courses in this Track</h2>

        {isCoursesLoading ? (
          <div className={styles.loading}>Loading courses...</div>
        ) : trackCourses.length === 0 ? (
          <div className={styles.empty}>No courses found in this track.</div>
        ) : (
          <div className={styles.coursesGrid}>
            {trackCourses.map((course) => (
              <Link key={course._id} href={`/courses/${course._id}`} className={styles.courseCard}>
                <div className={styles.courseThumbnail}>
                  <Image
                    src={
                      course.thumbnail ||
                      `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(course.title) || "/placeholder.svg"}`
                    }
                    alt={course.title}
                    width={600}
                    height={400}
                    className={styles.courseImage}
                  />
                  {course.isPremium && <div className={styles.premiumBadge}>Premium</div>}
                </div>
                <div className={styles.courseContent}>
                  <h3>{course.title}</h3>
                  <p className={styles.courseDescription}>{course.description}</p>
                  <div className={styles.instructor}>
                    <Image
                      src={course.instructor.avatar || "/placeholder.svg?height=40&width=40"}
                      alt={course.instructor.name}
                      width={24}
                      height={24}
                      className={styles.avatar}
                    />
                    <span>{course.instructor.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
