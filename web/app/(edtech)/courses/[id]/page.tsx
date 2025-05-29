import CourseDetails from "@/components/courses/course-details"
import styles from "./course-details.module.css"

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.courseDetailsPage}>
      <div className={styles.container}>
        <CourseDetails courseId={params.id} />
      </div>
    </div>
  )
}
