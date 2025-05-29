"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuthStore } from "@/store/auth-store"
import styles from "./sidebar.module.css"

// Icons (using emoji as placeholders - in a real app, you'd use proper SVG icons)
const ICONS = {
  dashboard: "📊",
  courses: "📚",
  lessons: "📝",
  resources: "📎",
  tracks: "🧭",
  bootcamps: "🏕️",
  users: "👥",
  settings: "⚙️",
  logout: "🚪",
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuthStore()
  const [expanded, setExpanded] = useState(true)

  if (!user) return null

  const isActive = (path: string) => pathname === path

  // Define navigation items based on user role
  const getNavItems = () => {
    const items = [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: ICONS.dashboard,
        roles: ["student", "instructor", "admin", "superadmin"],
      },
    ]

    // Student-specific items
    if (user.role === "student") {
      items.push(
        {
          name: "My Courses",
          path: "/dashboard/enrolled",
          icon: ICONS.courses,
          roles: ["student"],
        },
        {
          name: "My Tracks",
          path: "/dashboard/tracks",
          icon: ICONS.tracks,
          roles: ["student"],
        },
      )
    }

    // Instructor items
    if (["instructor", "admin", "superadmin"].includes(user.role)) {
      items.push(
        {
          name: "Courses",
          path: "/dashboard/courses",
          icon: ICONS.courses,
          roles: ["instructor", "admin", "superadmin"],
        },
        {
          name: "Lessons",
          path: "/dashboard/lessons",
          icon: ICONS.lessons,
          roles: ["instructor", "admin", "superadmin"],
        },
        {
          name: "Resources",
          path: "/dashboard/resources",
          icon: ICONS.resources,
          roles: ["instructor", "admin", "superadmin"],
        },
        {
          name: "Tracks",
          path: "/dashboard/tracks-manage",
          icon: ICONS.tracks,
          roles: ["instructor", "admin", "superadmin"],
        },
        {
          name: "Bootcamps",
          path: "/dashboard/bootcamps",
          icon: ICONS.bootcamps,
          roles: ["instructor", "admin", "superadmin"],
        },
      )
    }

    // Admin items
    if (["admin", "superadmin"].includes(user.role)) {
      items.push({
        name: "Users",
        path: "/dashboard/users",
        icon: ICONS.users,
        roles: ["admin", "superadmin"],
      })
    }

    // Superadmin items
    if (user.role === "superadmin") {
      items.push({
        name: "Settings",
        path: "/dashboard/settings",
        icon: ICONS.settings,
        roles: ["superadmin"],
      })
    }

    return items.filter((item) => item.roles.includes(user.role))
  }

  const navItems = getNavItems()

  return (
    <div className={`${styles.sidebar} ${expanded ? "" : styles.collapsed}`}>
      <div className={styles.sidebarHeader}>
        <button
          className={styles.toggleButton}
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {expanded ? "◀" : "▶"}
        </button>
        {expanded && <h2 className={styles.sidebarTitle}>EdTech Dashboard</h2>}
      </div>

      <nav className={styles.navigation}>
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.path} className={styles.navItem}>
              <Link href={item.path} className={`${styles.navLink} ${isActive(item.path) ? styles.active : ""}`}>
                <span className={styles.navIcon}>{item.icon}</span>
                {expanded && <span className={styles.navText}>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.sidebarFooter}>
        <button className={styles.logoutButton} onClick={logout}>
          <span className={styles.navIcon}>{ICONS.logout}</span>
          {expanded && <span className={styles.navText}>Logout</span>}
        </button>
      </div>
    </div>
  )
}
