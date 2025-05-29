"use client"

import type React from "react"

import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import DashboardSidebar from "./sidebar"
import styles from "./layout.module.css"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className={styles.dashboardLayout}>
      <DashboardSidebar />
      <main className={styles.dashboardMain}>{children}</main>
    </div>
  )
}
