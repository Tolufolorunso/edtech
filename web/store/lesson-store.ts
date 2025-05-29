import { create } from "zustand"

export interface Lesson {
  _id: string
  title: string
  videoUrl: string[]
  content?: string
  course: string
  position: number
  createdAt: string
  updatedAt: string
}

export interface Resource {
  _id: string
  lesson: string
  type: "pdf" | "doc" | "link" | "note" | "assignment"
  title: string
  url?: string
  content?: string
  createdAt: string
  updatedAt: string
}

export interface Quiz {
  _id: string
  lesson: string
  title: string
  description?: string
  isAIgenerated: boolean
  createdBy?: string
  createdAt: string
  updatedAt: string
}

interface LessonState {
  lessons: Lesson[]
  currentLesson: Lesson | null
  resources: Resource[]
  quizzes: Quiz[]
  isLoading: boolean
  error: string | null
  fetchLessonsByCourse: (courseId: string) => Promise<void>
  fetchLessonById: (lessonId: string) => Promise<void>
  fetchResourcesByLesson: (lessonId: string) => Promise<void>
  fetchQuizzesByLesson: (lessonId: string) => Promise<void>
}

// Mock lesson data
const mockLessons: Lesson[] = [
  {
    _id: "1-1",
    title: "Introduction to JavaScript",
    videoUrl: ["https://www.youtube.com/watch?v=PkZNo7MFNFg"],
    content: "In this lesson, we'll introduce you to the basics of JavaScript programming language.",
    course: "1",
    position: 1,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "1-2",
    title: "Variables and Data Types",
    videoUrl: ["https://www.youtube.com/watch?v=edlFjlzxkSI"],
    content: "Learn about variables, constants, and different data types in JavaScript.",
    course: "1",
    position: 2,
    createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "1-3",
    title: "Functions and Scope",
    videoUrl: ["https://www.youtube.com/watch?v=xUI5Tsl2JpY"],
    content: "Understand how to create and use functions, and learn about variable scope.",
    course: "1",
    position: 3,
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "1-4",
    title: "Arrays and Objects",
    videoUrl: ["https://www.youtube.com/watch?v=rRgD1yVwIvE"],
    content: "Learn how to work with arrays and objects, the fundamental data structures in JavaScript.",
    course: "1",
    position: 4,
    createdAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "1-5",
    title: "Control Flow",
    videoUrl: ["https://www.youtube.com/watch?v=JloLGV9DmtQ"],
    content: "Master conditional statements and loops to control the flow of your programs.",
    course: "1",
    position: 5,
    createdAt: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2-1",
    title: "Introduction to React",
    videoUrl: ["https://www.youtube.com/watch?v=Tn6-PIqc4UM"],
    content: "Get started with React, a popular JavaScript library for building user interfaces.",
    course: "2",
    position: 1,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2-2",
    title: "Components and Props",
    videoUrl: ["https://www.youtube.com/watch?v=FHU7nJZBiWs"],
    content: "Learn about React components and how to pass data using props.",
    course: "2",
    position: 2,
    createdAt: new Date(Date.now() - 24 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock resource data
const mockResources: Resource[] = [
  {
    _id: "r1-1",
    lesson: "1-1",
    type: "pdf",
    title: "JavaScript Basics Cheat Sheet",
    url: "https://example.com/js-cheatsheet.pdf",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "r1-2",
    lesson: "1-1",
    type: "link",
    title: "MDN JavaScript Documentation",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "r1-3",
    lesson: "1-1",
    type: "assignment",
    title: "JavaScript Basics Exercise",
    content: "Create a simple program that calculates the area of a rectangle using variables and functions.",
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "r1-4",
    lesson: "1-2",
    type: "pdf",
    title: "JavaScript Data Types Reference",
    url: "https://example.com/js-data-types.pdf",
    createdAt: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "r1-5",
    lesson: "1-2",
    type: "assignment",
    title: "Variables and Data Types Exercise",
    content: "Create variables of different data types and perform operations on them.",
    createdAt: new Date(Date.now() - 26 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

// Mock quiz data
const mockQuizzes: Quiz[] = [
  {
    _id: "q1-1",
    lesson: "1-1",
    title: "JavaScript Basics Quiz",
    description: "Test your knowledge of JavaScript basics.",
    isAIgenerated: false,
    createdBy: "2",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "q1-2",
    lesson: "1-2",
    title: "Variables and Data Types Quiz",
    description: "Test your understanding of JavaScript variables and data types.",
    isAIgenerated: true,
    createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const useLessonStore = create<LessonState>((set) => ({
  lessons: [],
  currentLesson: null,
  resources: [],
  quizzes: [],
  isLoading: false,
  error: null,

  fetchLessonsByCourse: async (courseId: string) => {
    set({ isLoading: true, error: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const courseLessons = mockLessons.filter((lesson) => lesson.course === courseId)
      // Sort by position
      courseLessons.sort((a, b) => a.position - b.position)

      set({
        lessons: courseLessons,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch lessons",
        isLoading: false,
      })
    }
  },

  fetchLessonById: async (lessonId: string) => {
    set({ isLoading: true, error: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const lesson = mockLessons.find((l) => l._id === lessonId)

      if (!lesson) {
        throw new Error("Lesson not found")
      }

      set({
        currentLesson: lesson,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch lesson",
        isLoading: false,
      })
    }
  },

  fetchResourcesByLesson: async (lessonId: string) => {
    set({ isLoading: true, error: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const lessonResources = mockResources.filter((resource) => resource.lesson === lessonId)

      set({
        resources: lessonResources,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch resources",
        isLoading: false,
      })
    }
  },

  fetchQuizzesByLesson: async (lessonId: string) => {
    set({ isLoading: true, error: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const lessonQuizzes = mockQuizzes.filter((quiz) => quiz.lesson === lessonId)

      set({
        quizzes: lessonQuizzes,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch quizzes",
        isLoading: false,
      })
    }
  },
}))
