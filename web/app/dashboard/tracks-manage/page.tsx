"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import { useTracksStore } from "@/store/tracks-store"
import styles from "./tracks-manage.module.css"

export default function TracksManagementPage() {
  const { user } = useAuthStore()
  const { tracks } = useTracksStore()
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Check if user has instructor permissions
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

  // Filter tracks based on user role, filter, and search query
  const filteredTracks = (() => {
    let filtered = tracks

    // For instructors, only show their own tracks unless they're admin/superadmin
    if (user.role === "instructor") {
      filtered = tracks.filter((track) => track.creator === user.id)
    }

    // Apply additional filters
    if (filter === "published") {
      filtered = filtered.filter((track) => track.isPublished)
    } else if (filter === "draft") {
      filtered = filtered.filter((track) => !track.isPublished)
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (track) =>
          track.title.toLowerCase().includes(query) ||
          (track.description && track.description.toLowerCase().includes(query)),
      )
    }

    return filtered
  })()

  // Handle track deletion
  const handleDeleteTrack = (trackId: string) => {
    // In a real app, this would make an API call to delete the track
    console.log(`Deleting track ${trackId}`)
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Track Management</h1>
          <p>Create, edit, and manage your learning tracks.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <div className={styles.filters}>
            <label htmlFor="status-filter">Filter by status:</label>
            <select
              id="status-filter"
              className={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Tracks</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Link href="/dashboard/tracks-manage/create" className={styles.addButton}>
            Create New Track
          </Link>
        </div>

        {filteredTracks.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🧭</div>
            <h3>No tracks found</h3>
            <p>
              {searchQuery
                ? "No tracks match your search criteria. Try adjusting your filters."
                : "You haven't created any tracks yet. Get started by creating your first track."}
            </p>
            <Link href="/dashboard/tracks-manage/create" className={styles.createButton}>
              Create Track
            </Link>
          </div>
        ) : (
          <div className={styles.trackGrid}>
            {filteredTracks.map((track) => (
              <div key={track._id} className={styles.trackCard}>
                <div className={styles.trackImageContainer}>
                  <Image
                    src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(track.title)}`}
                    alt={track.title}
                    width={600}
                    height={400}
                    className={styles.trackImage}
                  />
                  <div className={styles.trackStatus}>{track.isPublished ? "Published" : "Draft"}</div>
                </div>
                <div className={styles.trackContent}>
                  <h3 className={styles.trackTitle}>{track.title}</h3>
                  <p className={styles.trackDescription}>
                    {track.description?.substring(0, 100)}
                    {track.description && track.description.length > 100 ? "..." : ""}
                  </p>
                  <div className={styles.trackInfo}>
                    <span>{track.courses?.length || 0} Courses</span>
                    <span>Level: {track.level || "All Levels"}</span>
                  </div>
                  <div className={styles.trackActions}>
                    <Link href={`/dashboard/tracks-manage/edit/${track._id}`} className={styles.editButton}>
                      Edit
                    </Link>
                    <Link href={`/dashboard/tracks-manage/courses/${track._id}`} className={styles.coursesButton}>
                      Manage Courses
                    </Link>
                    <button className={styles.deleteButton} onClick={() => handleDeleteTrack(track._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
