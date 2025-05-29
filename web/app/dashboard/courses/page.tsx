"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import { useCoursesStore } from "@/store/courses-store"
import styles from "./courses.module.css"

export default function CoursesManagementPage() {
  const { user } = useAuthStore()
  const { courses } = useCoursesStore()
  const [filter, setFilter] = useState("all")

  // Check if user has instructor permissions
  if (!user || !["instructor", "admin", "superadmin"].includes(user.role)) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.unauthorized}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Filter courses based on user role and selected filter
  const filteredCourses = (() => {
    let filtered = courses

    // For instructors, only show their own courses unless they're admin/superadmin
    if (user.role === "instructor") {
      filtered = courses.filter((course) => course.instructor === user.id)
    }

    // Apply additional filters
    if (filter === "published") {
      return filtered.filter((course) => course.isPublished)
    } else if (filter === "draft") {
      return filtered.filter((course) => !course.isPublished)
    }

    return filtered
  })()

  // Handle course deletion
  const handleDeleteCourse = (courseId: string) => {
    // In a real app, this would make an API call to delete the course
    console.log(`Deleting course ${courseId}`)
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Course Management</h1>
          <p>Create, edit, and manage your courses.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <label htmlFor="status-filter">Filter by status:</label>
            <select
              id="status-filter"
              className={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <Link href="/dashboard/courses/create" className={styles.addButton}>
            Create New Course
          </Link>
        </div>

        {filteredCourses.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3>No courses found</h3>
            <p>
              {user.role === "instructor"
                ? "You haven't created any courses yet. Get started by creating your first course."
                : "No courses match your current filter. Try changing your filter or create a new course."}
            </p>
            <Link href="/dashboard/courses/create" className={styles.createButton}>
              Create Course
            </Link>
          </div>
        ) : (
          <div className={styles.courseGrid}>
            {filteredCourses.map((course) => (
              <div key={course._id} className={styles.courseCard}>
                <div className={styles.courseImageContainer}>
                  <Image
                    src={
                      course.thumbnail ||
                      `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(course.title) || "Course"}`
                    }
                    alt={course.title}
                    width={600}
                    height={400}
                    className={styles.courseImage}
                  />
                  <div className={styles.courseStatus}>{course.isPublished ? "Published" : "Draft"}</div>
                </div>
                <div className={styles.courseContent}>
                  <h3 className={styles.courseTitle}>{course.title}</h3>
                  <p className={styles.courseDescription}>
                    {course.description?.substring(0, 100)}
                    {course.description && course.description.length > 100 ? "..." : ""}
                  </p>
                  <div className={styles.courseInfo}>
                    <span>{course.lessons?.length || 0} Lessons</span>
                    <span>Level: {course.level || "Beginner"}</span>
                  </div>
                  <div className={styles.courseActions}>
                    <Link href={`/dashboard/courses/edit/${course._id}`} className={styles.editButton}>
                      Edit
                    </Link>
                    <button className={styles.deleteButton} onClick={() => handleDeleteCourse(course._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
