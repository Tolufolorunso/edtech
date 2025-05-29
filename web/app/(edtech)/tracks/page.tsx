import TracksGrid from "@/components/tracks/tracks-grid"
import styles from "./tracks.module.css"

export default function TracksPage() {
  return (
    <div className={styles.tracksPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Learning Tracks</h1>
          <p>
            Choose a learning track to follow a structured path through multiple courses designed to help you master a
            specific area of JavaScript development.
          </p>
        </div>

        <TracksGrid />
      </div>
    </div>
  )
}
