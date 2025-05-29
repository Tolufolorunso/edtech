"use client"

import { useEffect, useState } from "react"
import { useLessonStore } from "@/store/lesson-store"
import { useAuthStore } from "@/store/auth-store"
import VideoPlayer from "./video-player"
import ResourcesList from "./resources-list"
import QuizList from "./quiz-list"
import styles from "./lesson-content.module.css"

interface LessonContentProps {
  lessonId: string
}

export default function LessonContent({ lessonId }: LessonContentProps) {
  const { currentLesson, resources, quizzes, fetchLessonById, fetchResourcesByLesson, fetchQuizzesByLesson } =
    useLessonStore()
  const { markLessonComplete, isLessonCompleted } = useAuthStore()
  const [activeTab, setActiveTab] = useState<"content" | "resources" | "quizzes">("content")
  const [isLoading, setIsLoading] = useState(true)
  const isCompleted = isLessonCompleted(lessonId)

  useEffect(() => {
    const loadLessonData = async () => {
      setIsLoading(true)
      await Promise.all([fetchLessonById(lessonId), fetchResourcesByLesson(lessonId), fetchQuizzesByLesson(lessonId)])
      setIsLoading(false)
    }

    loadLessonData()
  }, [lessonId, fetchLessonById, fetchResourcesByLesson, fetchQuizzesByLesson])

  const handleMarkComplete = () => {
    markLessonComplete(lessonId)
  }

  if (isLoading) {
    return <div className={styles.loading}>Loading lesson content...</div>
  }

  if (!currentLesson) {
    return <div className={styles.error}>Lesson not found</div>
  }

  return (
    <div className={styles.lessonContent}>
      <div className={styles.videoContainer}>
        {currentLesson.videoUrl && currentLesson.videoUrl.length > 0 ? (
          <VideoPlayer videoUrl={currentLesson.videoUrl[0]} />
        ) : (
          <div className={styles.noVideo}>No video available for this lesson</div>
        )}
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "content" ? styles.active : ""}`}
            onClick={() => setActiveTab("content")}
          >
            Lesson Content
          </button>
          <button
            className={`${styles.tab} ${activeTab === "resources" ? styles.active : ""}`}
            onClick={() => setActiveTab("resources")}
          >
            Resources {resources.length > 0 && <span className={styles.badge}>{resources.length}</span>}
          </button>
          <button
            className={`${styles.tab} ${activeTab === "quizzes" ? styles.active : ""}`}
            onClick={() => setActiveTab("quizzes")}
          >
            Quizzes {quizzes.length > 0 && <span className={styles.badge}>{quizzes.length}</span>}
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "content" && (
            <div className={styles.lessonText}>
              <h2>{currentLesson.title}</h2>
              <div className={styles.content}>{currentLesson.content || "No content available for this lesson."}</div>
            </div>
          )}

          {activeTab === "resources" && <ResourcesList resources={resources} />}

          {activeTab === "quizzes" && <QuizList quizzes={quizzes} />}
        </div>

        <div className={styles.actions}>
          {!isCompleted ? (
            <button className={styles.completeButton} onClick={handleMarkComplete}>
              Mark as Completed
            </button>
          ) : (
            <div className={styles.completedMessage}>
              <span className={styles.checkmark}>✓</span> Lesson Completed
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
