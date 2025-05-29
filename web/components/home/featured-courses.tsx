"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useCoursesStore } from "@/store/courses-store"
import styles from "./featured-courses.module.css"

export default function FeaturedCourses() {
  const { featuredCourses, isLoading, error, fetchCourses } = useCoursesStore()

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  if (isLoading) {
    return <div className={styles.loading}>Loading courses...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  if (!featuredCourses || featuredCourses.length === 0) {
    return <div className={styles.loading}>No featured courses available.</div>
  }

  return (
    <div className={styles.grid}>
      {featuredCourses.map((course) => (
        <Link key={course._id} href={`/courses/${course._id}`} className={styles.card}>
          <div className={styles.thumbnail}>
            <Image
              src={course.thumbnail || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(course.title)}`}
              alt={course.title}
              width={600}
              height={400}
              className={styles.image}
            />
            {course.isPremium ? (
              <div className={styles.premiumBadge}>Premium</div>
            ) : (
              <div className={styles.freeBadge}>Free</div>
            )}
          </div>
          <div className={styles.content}>
            <h3>{course.title}</h3>
            <p className={styles.instructor}>
              <Image
                src={course.instructor.avatar || "/placeholder.svg?height=40&width=40"}
                alt={course.instructor.name}
                width={24}
                height={24}
                className={styles.avatar}
              />
              {course.instructor.name}
            </p>
            <p className={styles.description}>{course.description}</p>
            <div className={styles.footer}>
              <span className={styles.viewCourse}>View Course →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
