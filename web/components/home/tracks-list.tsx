"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTracksStore } from "@/store/tracks-store"
import styles from "./tracks-list.module.css"

export default function TracksList() {
  const { tracks, isLoading, error, fetchTracks } = useTracksStore()

  useEffect(() => {
    fetchTracks()
  }, [fetchTracks])

  if (isLoading) {
    return <div className={styles.loading}>Loading tracks...</div>
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>
  }

  if (!tracks || tracks.length === 0) {
    return <div className={styles.loading}>No tracks available.</div>
  }

  return (
    <div className={styles.grid}>
      {tracks.map((track) => (
        <Link key={track._id} href={`/tracks/${track._id}`} className={styles.card}>
          <div className={styles.thumbnail}>
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(track.title)}`}
              alt={track.title}
              width={600}
              height={400}
              className={styles.image}
            />
          </div>
          <div className={styles.content}>
            <h3>{track.title}</h3>
            <p className={styles.description}>{track.description}</p>
            <div className={styles.footer}>
              <span className={styles.viewTrack}>View Track →</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
