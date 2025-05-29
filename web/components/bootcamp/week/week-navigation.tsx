"use client"

import { useState } from "react"
import Link from "next/link"
import styles from "./week-navigation.module.css"

interface WeekNavigationProps {
  bootcampSlug: string
  currentWeek: number
  totalWeeks: number
}

export default function WeekNavigation({ bootcampSlug, currentWeek, totalWeeks }: WeekNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1)

  return (
    <div className={styles.container}>
      <div className={styles.mobileToggle} onClick={toggleMobileMenu}>
        <span>Week {currentWeek}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`${styles.icon} ${mobileMenuOpen ? styles.open : ""}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>

      <nav className={`${styles.navigation} ${mobileMenuOpen ? styles.open : ""}`}>
        <h3 className={styles.title}>Bootcamp Weeks</h3>
        <ul className={styles.weeksList}>
          {weeks.map((week) => (
            <li key={week} className={week === currentWeek ? styles.active : ""}>
              <Link href={`/bootcamp/${bootcampSlug}/week/${week}`}>
                <span className={styles.weekNumber}>Week {week}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.checkIcon}
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link href={`/bootcamp/${bootcampSlug}`} className={styles.backButton}>
            Back to Bootcamp
          </Link>
        </div>
      </nav>
    </div>
  )
}
