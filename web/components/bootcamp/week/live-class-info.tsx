import styles from "./live-class-info.module.css"

interface LiveClass {
  date: string
  time: string
  instructor: string
  topic: string
  link: string
  description: string
}

interface LiveClassInfoProps {
  liveClass: LiveClass
}

export default function LiveClassInfo({ liveClass }: LiveClassInfoProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Live Class Information</h2>
      <p className={styles.description}>
        Join our interactive live session to learn directly from our instructors and ask questions in real-time.
      </p>

      <div className={styles.classCard}>
        <div className={styles.classHeader}>
          <h3 className={styles.classTopic}>{liveClass.topic}</h3>
          <div className={styles.classInstructor}>
            <span>Instructor:</span> {liveClass.instructor}
          </div>
        </div>

        <div className={styles.classDetails}>
          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className={styles.detailText}>{liveClass.date}</div>
          </div>

          <div className={styles.detailItem}>
            <div className={styles.detailIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className={styles.detailText}>{liveClass.time}</div>
          </div>
        </div>

        <div className={styles.classDescription}>{liveClass.description}</div>

        <div className={styles.classActions}>
          <a href={liveClass.link} target="_blank" rel="noopener noreferrer" className={styles.joinButton}>
            Join Live Class
          </a>

          <button className={styles.calendarButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            Add to Calendar
          </button>
        </div>
      </div>

      <div className={styles.reminder}>
        <div className={styles.reminderIcon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <div className={styles.reminderText}>
          <strong>Reminder:</strong> Live classes are recorded and will be available for replay if you can't attend in
          real-time.
        </div>
      </div>
    </div>
  )
}
