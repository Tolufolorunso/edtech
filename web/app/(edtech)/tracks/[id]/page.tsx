import TrackDetails from "@/components/tracks/track-details"
import styles from "./track-details.module.css"

export default function TrackDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className={styles.trackDetailsPage}>
      <div className={styles.container}>
        <TrackDetails trackId={params.id} />
      </div>
    </div>
  )
}
