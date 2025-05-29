"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import { useCoursesStore } from "@/store/courses-store"
import styles from "./lessons.module.css"

// Mock lessons data
const mockLessons = [
  {
    id: "1",
    title: "Introduction to JavaScript",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    duration: "45 minutes",
    order: 1,
    status: "published",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Variables and Data Types",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    duration: "60 minutes",
    order: 2,
    status: "published",
    createdAt: "2023-05-16T11:30:00Z",
  },
  {
    id: "3",
    title: "Functions and Scope",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    duration: "55 minutes",
    order: 3,
    status: "draft",
    createdAt: "2023-05-17T09:45:00Z",
  },
  {
    id: "4",
    title: "React Components",
    courseId: "2",
    courseName: "React Essentials",
    duration: "65 minutes",
    order: 1,
    status: "published",
    createdAt: "2023-05-20T14:20:00Z",
  },
]

export default function LessonsManagementPage() {
  const { user } = useAuthStore()
  const { courses, fetchCourses } = useCoursesStore()
  const [lessons, setLessons] = useState(mockLessons)
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

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

  // Filter lessons based on user role, course, status, and search query
  const filteredLessons = (() => {
    let filtered = lessons

    // For instructors, only show lessons from their own courses
    if (user.role === "instructor") {
      const instructorCourseIds = courses.filter((course) => course.instructor === user.id).map((course) => course._id)
      filtered = lessons.filter((lesson) => instructorCourseIds.includes(lesson.courseId))
    }

    // Apply course filter
    if (selectedCourse !== "all") {
      filtered = filtered.filter((lesson) => lesson.courseId === selectedCourse)
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((lesson) => lesson.status === statusFilter)
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (lesson) => lesson.title.toLowerCase().includes(query) || lesson.courseName.toLowerCase().includes(query),
      )
    }

    return filtered
  })()

  // Handle lesson deletion
  const handleDeleteLesson = (lessonId: string) => {
    // In a real app, this would make an API call to delete the lesson
    console.log(`Deleting lesson ${lessonId}`)
    setLessons(lessons.filter((lesson) => lesson.id !== lessonId))
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Lesson Management</h1>
          <p>Create, edit, and manage your course lessons.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <div className={styles.filterGroup}>
              <label htmlFor="course-filter">Course:</label>
              <select
                id="course-filter"
                className={styles.select}
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label htmlFor="status-filter">Status:</label>
              <select
                id="status-filter"
                className={styles.select}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          <Link href="/dashboard/lessons/create" className={styles.addButton}>
            Create New Lesson
          </Link>
        </div>

        {filteredLessons.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📝</div>
            <h3>No lessons found</h3>
            <p>
              {searchQuery
                ? "No lessons match your search criteria. Try adjusting your filters."
                : "You haven't created any lessons yet. Get started by creating your first lesson."}
            </p>
            <Link href="/dashboard/lessons/create" className={styles.createButton}>
              Create Lesson
            </Link>
          </div>
        ) : (
          <div className={styles.lessonTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Title</div>
              <div className={styles.tableCell}>Course</div>
              <div className={styles.tableCell}>Duration</div>
              <div className={styles.tableCell}>Order</div>
              <div className={styles.tableCell}>Status</div>
              <div className={styles.tableCell}>Actions</div>
            </div>

            {filteredLessons.map((lesson) => (
              <div key={lesson.id} className={styles.tableRow}>
                <div className={styles.tableCell}>{lesson.title}</div>
                <div className={styles.tableCell}>{lesson.courseName}</div>
                <div className={styles.tableCell}>{lesson.duration}</div>
                <div className={styles.tableCell}>{lesson.order}</div>
                <div className={styles.tableCell}>
                  <span
                    className={`${styles.statusBadge} ${
                      lesson.status === "published" ? styles.published : styles.draft
                    }`}
                  >
                    {lesson.status}
                  </span>
                </div>
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <Link href={`/dashboard/lessons/edit/${lesson.id}`} className={styles.editButton}>
                      Edit
                    </Link>
                    <button className={styles.deleteButton} onClick={() => handleDeleteLesson(lesson.id)}>
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
