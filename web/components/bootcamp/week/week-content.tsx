"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import WeekNavigation from "./week-navigation"
import VideoPlayer from "./video-player"
import ResourcesList from "./resources-list"
import LiveClassInfo from "./live-class-info"
import QuizList from "./quiz-list"
import styles from "./week-content.module.css"

interface Video {
  id: number
  title: string
  description: string
  duration: string
  url: string
}

interface Resource {
  id: number
  title: string
  type: string
  url: string
}

interface LiveClass {
  date: string
  time: string
  instructor: string
  topic: string
  link: string
  description: string
}

interface Quiz {
  id: number
  title: string
  questions: number
  timeLimit: string
  url: string
}

interface WeekData {
  weekNumber: number
  title: string
  description: string
  videos: Video[]
  resources: Resource[]
  liveClass: LiveClass
  quizzes: Quiz[]
  completed: boolean
}

interface WeekContentProps {
  bootcampSlug: string
  bootcampTitle: string
  weekData: WeekData
  totalWeeks: number
}

export default function WeekContent({ bootcampSlug, bootcampTitle, weekData, totalWeeks }: WeekContentProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("content")
  const [selectedVideo, setSelectedVideo] = useState(weekData.videos[0])
  const [isCompleted, setIsCompleted] = useState(weekData.completed)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video)
  }

  const handleMarkAsCompleted = async () => {
    try {
      // This would be an API call in a real application
      // await fetch(`/api/bootcamp/${bootcampSlug}/week/${weekData.weekNumber}/complete`, {
      //   method: 'POST',
      // })

      // Mock successful completion
      console.log(`Marked week ${weekData.weekNumber} as completed`)

      // Update local state
      setIsCompleted(true)

      // Show success message or redirect to next week
      if (weekData.weekNumber < totalWeeks) {
        // Optionally redirect to next week
        // router.push(`/bootcamp/${bootcampSlug}/week/${weekData.weekNumber + 1}`)
      }
    } catch (error) {
      console.error("Error marking week as completed:", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.breadcrumbs}>
          <Link href="/bootcamp">Bootcamps</Link> / <Link href={`/bootcamp/${bootcampSlug}`}>{bootcampTitle}</Link> /{" "}
          <span>Week {weekData.weekNumber}</span>
        </div>
        <h1 className={styles.title}>
          Week {weekData.weekNumber}: {weekData.title}
        </h1>
        <p className={styles.description}>{weekData.description}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.sidebar}>
          <WeekNavigation bootcampSlug={bootcampSlug} currentWeek={weekData.weekNumber} totalWeeks={totalWeeks} />
        </div>

        <div className={styles.mainContent}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${activeTab === "content" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("content")}
            >
              Week Content
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "resources" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("resources")}
            >
              Resources
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "liveClass" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("liveClass")}
            >
              Live Class
            </button>
            <button
              className={`${styles.tabButton} ${activeTab === "quizzes" ? styles.activeTab : ""}`}
              onClick={() => handleTabChange("quizzes")}
            >
              Quizzes
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === "content" && (
              <div className={styles.contentTab}>
                <VideoPlayer video={selectedVideo} />

                <div className={styles.videoSelector}>
                  <h3>Available Videos</h3>
                  <div className={styles.videoList}>
                    {weekData.videos.map((video) => (
                      <button
                        key={video.id}
                        className={`${styles.videoButton} ${selectedVideo.id === video.id ? styles.activeVideo : ""}`}
                        onClick={() => handleVideoSelect(video)}
                      >
                        <span className={styles.videoTitle}>{video.title}</span>
                        <span className={styles.videoDuration}>{video.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "resources" && <ResourcesList resources={weekData.resources} />}

            {activeTab === "liveClass" && <LiveClassInfo liveClass={weekData.liveClass} />}

            {activeTab === "quizzes" && <QuizList quizzes={weekData.quizzes} />}
          </div>

          <div className={styles.completion}>
            <button
              className={`${styles.completeButton} ${isCompleted ? styles.completed : ""}`}
              onClick={handleMarkAsCompleted}
              disabled={isCompleted}
            >
              {isCompleted ? "Week Completed ✓" : "Mark as Completed"}
            </button>

            {weekData.weekNumber < totalWeeks && isCompleted && (
              <Link
                href={`/bootcamp/${bootcampSlug}/week/${weekData.weekNumber + 1}`}
                className={styles.nextWeekButton}
              >
                Continue to Week {weekData.weekNumber + 1}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
