"use client"

import { useEffect, useRef } from "react"
import styles from "./video-player.module.css"

interface VideoPlayerProps {
  videoUrl: string
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Function to extract YouTube video ID
    const getYouTubeVideoId = (url: string) => {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
      const match = url.match(regExp)
      return match && match[2].length === 11 ? match[2] : null
    }

    // If we have an iframe reference and a valid URL
    if (iframeRef.current && videoUrl) {
      const videoId = getYouTubeVideoId(videoUrl)
      if (videoId) {
        iframeRef.current.src = `https://www.youtube.com/embed/${videoId}`
      }
    }
  }, [videoUrl])

  return (
    <div className={styles.videoWrapper}>
      <iframe
        ref={iframeRef}
        className={styles.videoIframe}
        title="Course Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}
