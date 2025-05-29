import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useAuthStore } from "./auth-store"

export interface Enrollment {
  _id: string
  student: string
  course?: string
  track?: string
  enrolledAt: string
  createdAt: string
  updatedAt: string
}

interface EnrollmentState {
  enrollments: Enrollment[]
  isLoading: boolean
  error: string | null
  fetchEnrollments: () => Promise<void>
  enrollInCourse: (courseId: string) => Promise<void>
  enrollInTrack: (trackId: string) => Promise<void>
  isEnrolledInCourse: (courseId: string) => boolean
  isEnrolledInTrack: (trackId: string) => boolean
}

// Mock enrollments (will be populated based on user actions)
const mockEnrollments: Enrollment[] = []

let enrollmentCounter = 1

export const useEnrollmentStore = create<EnrollmentState>()(
  persist(
    (set, get) => ({
      enrollments: mockEnrollments,
      isLoading: false,
      error: null,

      fetchEnrollments: async () => {
        const { user } = useAuthStore.getState()

        if (!user) {
          set({ error: "User not authenticated" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // In a real app, this would fetch enrollments from the backend
          set({
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to fetch enrollments",
            isLoading: false,
          })
        }
      },

      enrollInCourse: async (courseId: string) => {
        const { user } = useAuthStore.getState()

        if (!user) {
          set({ error: "User not authenticated" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Check if already enrolled
          const isAlreadyEnrolled = get().enrollments.some((e) => e.course === courseId && e.student === user.id)

          if (isAlreadyEnrolled) {
            throw new Error("Already enrolled in this course")
          }

          // Create new enrollment
          const newEnrollment: Enrollment = {
            _id: String(enrollmentCounter++),
            student: user.id,
            course: courseId,
            enrolledAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          set({
            enrollments: [...get().enrollments, newEnrollment],
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to enroll in course",
            isLoading: false,
          })
        }
      },

      enrollInTrack: async (trackId: string) => {
        const { user } = useAuthStore.getState()

        if (!user) {
          set({ error: "User not authenticated" })
          return
        }

        set({ isLoading: true, error: null })

        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Check if already enrolled
          const isAlreadyEnrolled = get().enrollments.some((e) => e.track === trackId && e.student === user.id)

          if (isAlreadyEnrolled) {
            throw new Error("Already enrolled in this track")
          }

          // Create new enrollment
          const newEnrollment: Enrollment = {
            _id: String(enrollmentCounter++),
            student: user.id,
            track: trackId,
            enrolledAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }

          set({
            enrollments: [...get().enrollments, newEnrollment],
            isLoading: false,
          })
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : "Failed to enroll in track",
            isLoading: false,
          })
        }
      },

      isEnrolledInCourse: (courseId: string) => {
        const { user } = useAuthStore.getState()
        if (!user) return false

        return get().enrollments.some((e) => e.course === courseId && e.student === user.id)
      },

      isEnrolledInTrack: (trackId: string) => {
        const { user } = useAuthStore.getState()
        if (!user) return false

        return get().enrollments.some((e) => e.track === trackId && e.student === user.id)
      },
    }),
    {
      name: "enrollment-storage",
    },
  ),
)
