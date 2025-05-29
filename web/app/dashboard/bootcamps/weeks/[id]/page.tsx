"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import styles from "./manage-weeks.module.css"

// Define types based on the provided model
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

interface Quiz {
  id: number
  title: string
  questions: number
  timeLimit: string
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

interface Week {
  weekNumber: number
  title: string
  description: string
  videos: Video[]
  resources: Resource[]
  liveClass: LiveClass
  quizzes: Quiz[]
  completed: boolean
}

interface Bootcamp {
  id: string
  title: string
  curriculum: Week[]
}

export default function ManageBootcampWeeksPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuthStore()
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeWeek, setActiveWeek] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>("overview")
  const [editMode, setEditMode] = useState(false)

  // Mock bootcamp data
  useEffect(() => {
    // In a real app, this would fetch the bootcamp data from an API
    const mockBootcamp: Bootcamp = {
      id: params.id,
      title: "React Native Masterclass",
      curriculum: [
        {
          weekNumber: 1,
          title: "Introduction to React Native",
          description: "Get started with React Native fundamentals and set up your development environment.",
          videos: [
            {
              id: 1,
              title: "Welcome to React Native",
              description: "An introduction to the course and React Native basics.",
              duration: "10:30",
              url: "https://example.com/video1",
            },
            {
              id: 2,
              title: "Setting Up Your Environment",
              description: "Learn how to set up your development environment for React Native.",
              duration: "15:45",
              url: "https://example.com/video2",
            },
          ],
          resources: [
            {
              id: 1,
              title: "React Native Documentation",
              type: "link",
              url: "https://reactnative.dev/docs/getting-started",
            },
            {
              id: 2,
              title: "Environment Setup Guide",
              type: "pdf",
              url: "https://example.com/setup-guide.pdf",
            },
          ],
          liveClass: {
            date: "2023-06-15",
            time: "18:00-20:00 EST",
            instructor: "John Doe",
            topic: "React Native Fundamentals Q&A",
            link: "https://meet.google.com/abc-defg-hij",
            description: "Live session to answer questions about React Native fundamentals.",
          },
          quizzes: [
            {
              id: 1,
              title: "React Native Basics Quiz",
              questions: 10,
              timeLimit: "15 minutes",
              url: "https://example.com/quiz1",
            },
          ],
          completed: false,
        },
        {
          weekNumber: 2,
          title: "Components and Styling",
          description: "Learn about React Native components and how to style them.",
          videos: [],
          resources: [],
          liveClass: {
            date: "",
            time: "",
            instructor: "",
            topic: "",
            link: "",
            description: "",
          },
          quizzes: [],
          completed: false,
        },
      ],
    }

    setBootcamp(mockBootcamp)
    setLoading(false)
  }, [params.id])

  // Check if user has instructor or admin permissions
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.loading}>Loading bootcamp data...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!bootcamp) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.error}>Bootcamp not found</div>
        </div>
      </DashboardLayout>
    )
  }

  const currentWeek = bootcamp.curriculum.find((week) => week.weekNumber === activeWeek) || bootcamp.curriculum[0]

  // Handle adding a new week
  const handleAddWeek = () => {
    if (!bootcamp) return

    const newWeekNumber = bootcamp.curriculum.length + 1
    const newWeek: Week = {
      weekNumber: newWeekNumber,
      title: `Week ${newWeekNumber}`,
      description: "",
      videos: [],
      resources: [],
      liveClass: {
        date: "",
        time: "",
        instructor: "",
        topic: "",
        link: "",
        description: "",
      },
      quizzes: [],
      completed: false,
    }

    setBootcamp({
      ...bootcamp,
      curriculum: [...bootcamp.curriculum, newWeek],
    })

    setActiveWeek(newWeekNumber)
  }

  // Handle adding a new video
  const handleAddVideo = () => {
    if (!bootcamp || !currentWeek) return

    const newVideo: Video = {
      id: currentWeek.videos.length + 1,
      title: "",
      description: "",
      duration: "",
      url: "",
    }

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          videos: [...week.videos, newVideo],
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })

    setEditMode(true)
  }

  // Handle adding a new resource
  const handleAddResource = () => {
    if (!bootcamp || !currentWeek) return

    const newResource: Resource = {
      id: currentWeek.resources.length + 1,
      title: "",
      type: "link",
      url: "",
    }

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          resources: [...week.resources, newResource],
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })

    setEditMode(true)
  }

  // Handle adding a new quiz
  const handleAddQuiz = () => {
    if (!bootcamp || !currentWeek) return

    const newQuiz: Quiz = {
      id: currentWeek.quizzes.length + 1,
      title: "",
      questions: 0,
      timeLimit: "",
      url: "",
    }

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          quizzes: [...week.quizzes, newQuiz],
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })

    setEditMode(true)
  }

  // Handle updating week data
  const handleWeekChange = (field: keyof Week, value: any) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          [field]: value,
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle updating video data
  const handleVideoChange = (videoId: number, field: keyof Video, value: string) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        const updatedVideos = week.videos.map((video) => {
          if (video.id === videoId) {
            return {
              ...video,
              [field]: value,
            }
          }
          return video
        })

        return {
          ...week,
          videos: updatedVideos,
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle updating resource data
  const handleResourceChange = (resourceId: number, field: keyof Resource, value: string) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        const updatedResources = week.resources.map((resource) => {
          if (resource.id === resourceId) {
            return {
              ...resource,
              [field]: value,
            }
          }
          return resource
        })

        return {
          ...week,
          resources: updatedResources,
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle updating live class data
  const handleLiveClassChange = (field: keyof LiveClass, value: string) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          liveClass: {
            ...week.liveClass,
            [field]: value,
          },
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle updating quiz data
  const handleQuizChange = (quizId: number, field: keyof Quiz, value: any) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        const updatedQuizzes = week.quizzes.map((quiz) => {
          if (quiz.id === quizId) {
            return {
              ...quiz,
              [field]: value,
            }
          }
          return quiz
        })

        return {
          ...week,
          quizzes: updatedQuizzes,
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle removing a video
  const handleRemoveVideo = (videoId: number) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          videos: week.videos.filter((video) => video.id !== videoId),
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle removing a resource
  const handleRemoveResource = (resourceId: number) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          resources: week.resources.filter((resource) => resource.id !== resourceId),
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle removing a quiz
  const handleRemoveQuiz = (quizId: number) => {
    if (!bootcamp || !currentWeek) return

    const updatedCurriculum = bootcamp.curriculum.map((week) => {
      if (week.weekNumber === currentWeek.weekNumber) {
        return {
          ...week,
          quizzes: week.quizzes.filter((quiz) => quiz.id !== quizId),
        }
      }
      return week
    })

    setBootcamp({
      ...bootcamp,
      curriculum: updatedCurriculum,
    })
  }

  // Handle saving changes
  const handleSaveChanges = () => {
    // In a real app, this would make an API call to save the bootcamp data
    console.log("Saving bootcamp curriculum:", bootcamp.curriculum)

    // Simulate API call
    setTimeout(() => {
      setEditMode(false)
      alert("Changes saved successfully!")
    }, 1000)
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h1>Manage Bootcamp Weeks: {bootcamp.title}</h1>
            <p>Organize your bootcamp curriculum by week</p>
          </div>
          <div className={styles.headerActions}>
            {editMode ? (
              <button onClick={handleSaveChanges} className={styles.saveButton}>
                Save Changes
              </button>
            ) : (
              <button onClick={() => setEditMode(true)} className={styles.editButton}>
                Edit Mode
              </button>
            )}
            <button onClick={() => router.push(`/dashboard/bootcamps`)} className={styles.backButton}>
              Back to Bootcamps
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.sidebar}>
            <div className={styles.weeksList}>
              <h3>Weeks</h3>
              <ul>
                {bootcamp.curriculum.map((week) => (
                  <li
                    key={week.weekNumber}
                    className={activeWeek === week.weekNumber ? styles.activeWeek : ""}
                    onClick={() => setActiveWeek(week.weekNumber)}
                  >
                    Week {week.weekNumber}: {week.title}
                  </li>
                ))}
              </ul>
              <button onClick={handleAddWeek} className={styles.addWeekButton}>
                + Add Week
              </button>
            </div>
          </div>

          <div className={styles.weekContent}>
            {currentWeek && (
              <>
                <div className={styles.weekHeader}>
                  {editMode ? (
                    <input
                      type="text"
                      value={currentWeek.title}
                      onChange={(e) => handleWeekChange("title", e.target.value)}
                      className={styles.weekTitleInput}
                      placeholder="Week Title"
                    />
                  ) : (
                    <h2>
                      Week {currentWeek.weekNumber}: {currentWeek.title}
                    </h2>
                  )}
                </div>

                <div className={styles.tabs}>
                  <button
                    className={`${styles.tabButton} ${activeTab === "overview" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("overview")}
                  >
                    Overview
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === "videos" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("videos")}
                  >
                    Videos
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === "resources" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("resources")}
                  >
                    Resources
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === "liveClass" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("liveClass")}
                  >
                    Live Class
                  </button>
                  <button
                    className={`${styles.tabButton} ${activeTab === "quizzes" ? styles.activeTab : ""}`}
                    onClick={() => setActiveTab("quizzes")}
                  >
                    Quizzes
                  </button>
                </div>

                <div className={styles.tabContent}>
                  {/* Overview Tab */}
                  {activeTab === "overview" && (
                    <div className={styles.overviewTab}>
                      <div className={styles.formGroup}>
                        <label>Week Description</label>
                        {editMode ? (
                          <textarea
                            value={currentWeek.description}
                            onChange={(e) => handleWeekChange("description", e.target.value)}
                            rows={4}
                            placeholder="Enter week description"
                          ></textarea>
                        ) : (
                          <p>{currentWeek.description || "No description provided."}</p>
                        )}
                      </div>

                      <div className={styles.overviewStats}>
                        <div className={styles.statCard}>
                          <h3>Videos</h3>
                          <p>{currentWeek.videos.length}</p>
                        </div>
                        <div className={styles.statCard}>
                          <h3>Resources</h3>
                          <p>{currentWeek.resources.length}</p>
                        </div>
                        <div className={styles.statCard}>
                          <h3>Quizzes</h3>
                          <p>{currentWeek.quizzes.length}</p>
                        </div>
                        <div className={styles.statCard}>
                          <h3>Live Class</h3>
                          <p>{currentWeek.liveClass.date ? "Scheduled" : "Not Scheduled"}</p>
                        </div>
                      </div>

                      <div className={styles.completionStatus}>
                        <label>
                          <input
                            type="checkbox"
                            checked={currentWeek.completed}
                            onChange={(e) => handleWeekChange("completed", e.target.checked)}
                            disabled={!editMode}
                          />
                          Mark Week as Complete
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Videos Tab */}
                  {activeTab === "videos" && (
                    <div className={styles.videosTab}>
                      {currentWeek.videos.length === 0 ? (
                        <div className={styles.emptyState}>
                          <p>No videos added yet.</p>
                          {editMode && (
                            <button onClick={handleAddVideo} className={styles.addButton}>
                              + Add Video
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          {currentWeek.videos.map((video) => (
                            <div key={video.id} className={styles.videoCard}>
                              {editMode ? (
                                <>
                                  <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      value={video.title}
                                      onChange={(e) => handleVideoChange(video.id, "title", e.target.value)}
                                      placeholder="Video title"
                                    />
                                  </div>
                                  <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                      value={video.description}
                                      onChange={(e) => handleVideoChange(video.id, "description", e.target.value)}
                                      rows={3}
                                      placeholder="Video description"
                                    ></textarea>
                                  </div>
                                  <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                      <label>Duration</label>
                                      <input
                                        type="text"
                                        value={video.duration}
                                        onChange={(e) => handleVideoChange(video.id, "duration", e.target.value)}
                                        placeholder="e.g., 10:30"
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>URL</label>
                                      <input
                                        type="text"
                                        value={video.url}
                                        onChange={(e) => handleVideoChange(video.id, "url", e.target.value)}
                                        placeholder="https://example.com/video"
                                      />
                                    </div>
                                  </div>
                                  <button onClick={() => handleRemoveVideo(video.id)} className={styles.removeButton}>
                                    Remove Video
                                  </button>
                                </>
                              ) : (
                                <>
                                  <h3>{video.title}</h3>
                                  <p>{video.description}</p>
                                  <div className={styles.videoMeta}>
                                    <span>Duration: {video.duration}</span>
                                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                                      View Video
                                    </a>
                                  </div>
                                </>
                              )}
                            </div>
                          ))}
                          {editMode && (
                            <button onClick={handleAddVideo} className={styles.addButton}>
                              + Add Another Video
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Resources Tab */}
                  {activeTab === "resources" && (
                    <div className={styles.resourcesTab}>
                      {currentWeek.resources.length === 0 ? (
                        <div className={styles.emptyState}>
                          <p>No resources added yet.</p>
                          {editMode && (
                            <button onClick={handleAddResource} className={styles.addButton}>
                              + Add Resource
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          {currentWeek.resources.map((resource) => (
                            <div key={resource.id} className={styles.resourceCard}>
                              {editMode ? (
                                <>
                                  <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      value={resource.title}
                                      onChange={(e) => handleResourceChange(resource.id, "title", e.target.value)}
                                      placeholder="Resource title"
                                    />
                                  </div>
                                  <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                      <label>Type</label>
                                      <select
                                        value={resource.type}
                                        onChange={(e) => handleResourceChange(resource.id, "type", e.target.value)}
                                      >
                                        <option value="pdf">PDF</option>
                                        <option value="doc">Document</option>
                                        <option value="link">Link</option>
                                        <option value="note">Note</option>
                                        <option value="assignment">Assignment</option>
                                        <option value="github">GitHub</option>
                                      </select>
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>URL</label>
                                      <input
                                        type="text"
                                        value={resource.url}
                                        onChange={(e) => handleResourceChange(resource.id, "url", e.target.value)}
                                        placeholder="https://example.com/resource"
                                      />
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handleRemoveResource(resource.id)}
                                    className={styles.removeButton}
                                  >
                                    Remove Resource
                                  </button>
                                </>
                              ) : (
                                <>
                                  <div className={styles.resourceHeader}>
                                    <h3>{resource.title}</h3>
                                    <span className={styles.resourceType}>{resource.type}</span>
                                  </div>
                                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                    Access Resource
                                  </a>
                                </>
                              )}
                            </div>
                          ))}
                          {editMode && (
                            <button onClick={handleAddResource} className={styles.addButton}>
                              + Add Another Resource
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Live Class Tab */}
                  {activeTab === "liveClass" && (
                    <div className={styles.liveClassTab}>
                      {editMode ? (
                        <div className={styles.liveClassForm}>
                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label>Date</label>
                              <input
                                type="text"
                                value={currentWeek.liveClass.date}
                                onChange={(e) => handleLiveClassChange("date", e.target.value)}
                                placeholder="YYYY-MM-DD"
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label>Time</label>
                              <input
                                type="text"
                                value={currentWeek.liveClass.time}
                                onChange={(e) => handleLiveClassChange("time", e.target.value)}
                                placeholder="e.g., 18:00-20:00 EST"
                              />
                            </div>
                          </div>
                          <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                              <label>Instructor</label>
                              <input
                                type="text"
                                value={currentWeek.liveClass.instructor}
                                onChange={(e) => handleLiveClassChange("instructor", e.target.value)}
                                placeholder="Instructor name"
                              />
                            </div>
                            <div className={styles.formGroup}>
                              <label>Topic</label>
                              <input
                                type="text"
                                value={currentWeek.liveClass.topic}
                                onChange={(e) => handleLiveClassChange("topic", e.target.value)}
                                placeholder="Class topic"
                              />
                            </div>
                          </div>
                          <div className={styles.formGroup}>
                            <label>Meeting Link</label>
                            <input
                              type="text"
                              value={currentWeek.liveClass.link}
                              onChange={(e) => handleLiveClassChange("link", e.target.value)}
                              placeholder="https://meet.google.com/..."
                            />
                          </div>
                          <div className={styles.formGroup}>
                            <label>Description</label>
                            <textarea
                              value={currentWeek.liveClass.description}
                              onChange={(e) => handleLiveClassChange("description", e.target.value)}
                              rows={4}
                              placeholder="Class description"
                            ></textarea>
                          </div>
                        </div>
                      ) : (
                        <div className={styles.liveClassDetails}>
                          {currentWeek.liveClass.date ? (
                            <>
                              <div className={styles.liveClassHeader}>
                                <h3>{currentWeek.liveClass.topic}</h3>
                                <span className={styles.liveClassInstructor}>
                                  with {currentWeek.liveClass.instructor}
                                </span>
                              </div>
                              <div className={styles.liveClassSchedule}>
                                <p>
                                  <strong>Date:</strong> {currentWeek.liveClass.date}
                                </p>
                                <p>
                                  <strong>Time:</strong> {currentWeek.liveClass.time}
                                </p>
                              </div>
                              <p className={styles.liveClassDescription}>{currentWeek.liveClass.description}</p>
                              <a
                                href={currentWeek.liveClass.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.joinButton}
                              >
                                Join Live Class
                              </a>
                            </>
                          ) : (
                            <div className={styles.emptyState}>
                              <p>No live class scheduled for this week.</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quizzes Tab */}
                  {activeTab === "quizzes" && (
                    <div className={styles.quizzesTab}>
                      {currentWeek.quizzes.length === 0 ? (
                        <div className={styles.emptyState}>
                          <p>No quizzes added yet.</p>
                          {editMode && (
                            <button onClick={handleAddQuiz} className={styles.addButton}>
                              + Add Quiz
                            </button>
                          )}
                        </div>
                      ) : (
                        <>
                          {currentWeek.quizzes.map((quiz) => (
                            <div key={quiz.id} className={styles.quizCard}>
                              {editMode ? (
                                <>
                                  <div className={styles.formGroup}>
                                    <label>Title</label>
                                    <input
                                      type="text"
                                      value={quiz.title}
                                      onChange={(e) => handleQuizChange(quiz.id, "title", e.target.value)}
                                      placeholder="Quiz title"
                                    />
                                  </div>
                                  <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                      <label>Number of Questions</label>
                                      <input
                                        type="number"
                                        value={quiz.questions}
                                        onChange={(e) =>
                                          handleQuizChange(quiz.id, "questions", Number.parseInt(e.target.value) || 0)
                                        }
                                        placeholder="e.g., 10"
                                      />
                                    </div>
                                    <div className={styles.formGroup}>
                                      <label>Time Limit</label>
                                      <input
                                        type="text"
                                        value={quiz.timeLimit}
                                        onChange={(e) => handleQuizChange(quiz.id, "timeLimit", e.target.value)}
                                        placeholder="e.g., 15 minutes"
                                      />
                                    </div>
                                  </div>
                                  <div className={styles.formGroup}>
                                    <label>URL</label>
                                    <input
                                      type="text"
                                      value={quiz.url}
                                      onChange={(e) => handleQuizChange(quiz.id, "url", e.target.value)}
                                      placeholder="https://example.com/quiz"
                                    />
                                  </div>
                                  <button onClick={() => handleRemoveQuiz(quiz.id)} className={styles.removeButton}>
                                    Remove Quiz
                                  </button>
                                </>
                              ) : (
                                <>
                                  <h3>{quiz.title}</h3>
                                  <div className={styles.quizMeta}>
                                    <span>{quiz.questions} questions</span>
                                    <span>{quiz.timeLimit}</span>
                                  </div>
                                  <a
                                    href={quiz.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.takeQuizButton}
                                  >
                                    Take Quiz
                                  </a>
                                </>
                              )}
                            </div>
                          ))}
                          {editMode && (
                            <button onClick={handleAddQuiz} className={styles.addButton}>
                              + Add Another Quiz
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
