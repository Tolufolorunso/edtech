import CoursesGrid from "@/components/courses/courses-grid"
import styles from "./courses.module.css"

export default function CoursesPage() {
  return (
    <div className={styles.coursesPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>All Courses</h1>
          <p>
            Browse our collection of JavaScript courses, from fundamentals to advanced topics, taught by industry
            experts.
          </p>
        </div>

        <CoursesGrid />
      </div>
    </div>
  )
}
