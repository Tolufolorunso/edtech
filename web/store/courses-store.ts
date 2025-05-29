import { create } from "zustand"

export interface Course {
  _id: string
  title: string
  description: string
  tracks: string[]
  instructor: {
    _id: string
    name: string
    avatar?: string
  }
  isPremium: boolean
  thumbnail?: string
  createdAt: string
  updatedAt: string
}

interface CoursesState {
  courses: Course[]
  featuredCourses: Course[]
  currentCourse: Course | null
  isLoading: boolean
  error: string | null
  fetchCourses: () => Promise<void>
  fetchCourseById: (id: string) => Promise<void>
}

// Mock course data
const mockCourses: Course[] = [
  {
    _id: "1",
    title: "JavaScript Fundamentals",
    description:
      "Learn the core concepts of JavaScript programming language, from variables and data types to functions and objects.",
    tracks: ["1", "2"],
    instructor: {
      _id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: false,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "2",
    title: "React.js for Beginners",
    description: "Start your journey with React.js, the popular JavaScript library for building user interfaces.",
    tracks: ["1"],
    instructor: {
      _id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: true,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "3",
    title: "Node.js Backend Development",
    description: "Build scalable and robust backend applications with Node.js and Express.",
    tracks: ["2", "4"],
    instructor: {
      _id: "3",
      name: "Admin User",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: true,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "4",
    title: "React Native Mobile Development",
    description: "Build cross-platform mobile applications using React Native.",
    tracks: ["3"],
    instructor: {
      _id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: true,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "5",
    title: "Advanced JavaScript Concepts",
    description: "Dive deep into advanced JavaScript concepts like closures, prototypes, and asynchronous programming.",
    tracks: ["1", "2"],
    instructor: {
      _id: "3",
      name: "Admin User",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: true,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    _id: "6",
    title: "MongoDB for Developers",
    description: "Learn how to use MongoDB to build scalable and flexible database solutions.",
    tracks: ["2", "4"],
    instructor: {
      _id: "2",
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=200&width=200",
    },
    isPremium: true,
    thumbnail: "/placeholder.svg?height=400&width=600",
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export const useCoursesStore = create<CoursesState>((set, get) => ({
  courses: [],
  featuredCourses: [],
  currentCourse: null,
  isLoading: false,
  error: null,

  fetchCourses: async () => {
    set({ isLoading: true, error: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set({
        courses: mockCourses,
        featuredCourses: mockCourses.slice(0, 3), // Get first 3 courses as featured
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch courses",
        isLoading: false,
      })
    }
  },

  fetchCourseById: async (id: string) => {
    set({ isLoading: true, error: null, currentCourse: null })

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const course = mockCourses.find((c) => c._id === id)

      if (!course) {
        throw new Error("Course not found")
      }

      set({
        currentCourse: course,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch course",
        isLoading: false,
      })
    }
  },
}))
