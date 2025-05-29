"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import styles from "./create-track.module.css"

interface TrackFormData {
  title: string
  description: string
}

export default function CreateTrackPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [formData, setFormData] = useState<TrackFormData>({
    title: "",
    description: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Check if user has admin permissions
  if (!user || !["admin", "superadmin"].includes(user.role)) {
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

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // In a real app, this would make an API call to create the track
        console.log("Creating track:", formData)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Redirect to tracks management page
        router.push("/dashboard/tracks-manage")
      } catch (error) {
        console.error("Error creating track:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Create New Track</h1>
          <p>Create a new learning track for your students.</p>
        </div>

        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Track Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter track title"
                className={errors.title ? styles.inputError : ""}
              />
              {errors.title && <div className={styles.errorMessage}>{errors.title}</div>}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter track description"
                rows={5}
                className={errors.description ? styles.inputError : ""}
              ></textarea>
              {errors.description && <div className={styles.errorMessage}>{errors.description}</div>}
            </div>

            <div className={styles.formActions}>
              <button
                type="button"
                onClick={() => router.push("/dashboard/tracks-manage")}
                className={styles.cancelButton}
              >
                Cancel
              </button>
              <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Track"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
