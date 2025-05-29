"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import { useCoursesStore } from "@/store/courses-store"
import styles from "./resources.module.css"

// Mock resources data
const mockResources = [
  {
    id: "1",
    title: "JavaScript Cheat Sheet",
    type: "pdf",
    url: "https://example.com/js-cheatsheet.pdf",
    lessonId: "1",
    lessonTitle: "Introduction to JavaScript",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Variables Exercise",
    type: "code",
    url: "https://github.com/example/variables-exercise",
    lessonId: "2",
    lessonTitle: "Variables and Data Types",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    createdAt: "2023-05-16T11:30:00Z",
  },
  {
    id: "3",
    title: "Functions Practice",
    type: "code",
    url: "https://github.com/example/functions-practice",
    lessonId: "3",
    lessonTitle: "Functions and Scope",
    courseId: "1",
    courseName: "JavaScript Fundamentals",
    createdAt: "2023-05-17T09:45:00Z",
  },
  {
    id: "4",
    title: "React Components Guide",
    type: "pdf",
    url: "https://example.com/react-components.pdf",
    lessonId: "4",
    lessonTitle: "React Components",
    courseId: "2",
    courseName: "React Essentials",
    createdAt: "2023-05-20T14:20:00Z",
  },
]

export default function ResourcesManagementPage() {
  const { user } = useAuthStore()
  const { courses, fetchCourses } = useCoursesStore()
  const [resources, setResources] = useState(mockResources)
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
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

  // Filter resources based on user role, course, type, and search query
  const filteredResources = (() => {
    let filtered = resources

    // For instructors, only show resources from their own courses
    if (user.role === "instructor") {
      const instructorCourseIds = courses.filter((course) => course.instructor === user.id).map((course) => course._id)
      filtered = resources.filter((resource) => instructorCourseIds.includes(resource.courseId))
    }

    // Apply course filter
    if (selectedCourse !== "all") {
      filtered = filtered.filter((resource) => resource.courseId === selectedCourse)
    }

    // Apply type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((resource) => resource.type === selectedType)
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (resource) =>
          resource.title.toLowerCase().includes(query) ||
          resource.lessonTitle.toLowerCase().includes(query) ||
          resource.courseName.toLowerCase().includes(query),
      )
    }

    return filtered
  })()

  // Handle resource deletion
  const handleDeleteResource = (resourceId: string) => {
    // In a real app, this would make an API call to delete the resource
    console.log(`Deleting resource ${resourceId}`)
    setResources(resources.filter((resource) => resource.id !== resourceId))
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Resource Management</h1>
          <p>Create, edit, and manage your course resources.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search resources..."
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
              <label htmlFor="type-filter">Type:</label>
              <select
                id="type-filter"
                className={styles.select}
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="code">Code</option>
                <option value="video">Video</option>
                <option value="link">Link</option>
              </select>
            </div>
          </div>

          <Link href="/dashboard/resources/create" className={styles.addButton}>
            Add New Resource
          </Link>
        </div>

        {filteredResources.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📎</div>
            <h3>No resources found</h3>
            <p>
              {searchQuery
                ? "No resources match your search criteria. Try adjusting your filters."
                : "You haven't added any resources yet. Get started by adding your first resource."}
            </p>
            <Link href="/dashboard/resources/create" className={styles.createButton}>
              Add Resource
            </Link>
          </div>
        ) : (
          <div className={styles.resourceTable}>
            <div className={styles.tableHeader}>
              <div className={styles.tableCell}>Title</div>
              <div className={styles.tableCell}>Type</div>
              <div className={styles.tableCell}>Lesson</div>
              <div className={styles.tableCell}>Course</div>
              <div className={styles.tableCell}>Actions</div>
            </div>

            {filteredResources.map((resource) => (
              <div key={resource.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <a href={resource.url} target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                    {resource.title}
                  </a>
                </div>
                <div className={styles.tableCell}>
                  <span className={`${styles.typeBadge} ${styles[resource.type]}`}>{resource.type.toUpperCase()}</span>
                </div>
                <div className={styles.tableCell}>{resource.lessonTitle}</div>
                <div className={styles.tableCell}>{resource.courseName}</div>
                <div className={styles.tableCell}>
                  <div className={styles.actionButtons}>
                    <Link href={`/dashboard/resources/edit/${resource.id}`} className={styles.editButton}>
                      Edit
                    </Link>
                    <button className={styles.deleteButton} onClick={() => handleDeleteResource(resource.id)}>
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
