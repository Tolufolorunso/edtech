"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard/layout"
import { useAuthStore } from "@/store/auth-store"
import styles from "./users.module.css"

// Mock users data
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "student",
    joinDate: "2023-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "instructor",
    joinDate: "2023-02-20",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    joinDate: "2022-12-01",
  },
  {
    id: "4",
    name: "Super Admin",
    email: "superadmin@example.com",
    role: "superadmin",
    joinDate: "2022-11-15",
  },
  {
    id: "5",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "student",
    joinDate: "2023-03-10",
  },
  {
    id: "6",
    name: "Bob Williams",
    email: "bob@example.com",
    role: "student",
    joinDate: "2023-04-05",
  },
  {
    id: "7",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "instructor",
    joinDate: "2023-02-28",
  },
]

export default function UsersPage() {
  const { user } = useAuthStore()
  const [users] = useState(mockUsers)
  const [selectedRole, setSelectedRole] = useState("all")

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

  // Filter users based on selected role
  const filteredUsers = selectedRole === "all" ? users : users.filter((u) => u.role === selectedRole)

  // Handle role change
  const handleRoleChange = (userId: string, newRole: string) => {
    // In a real app, this would make an API call to update the user's role
    console.log(`Changing user ${userId} role to ${newRole}`)
  }

  // Handle user deletion
  const handleDeleteUser = (userId: string) => {
    // In a real app, this would make an API call to delete the user
    console.log(`Deleting user ${userId}`)
  }

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>User Management</h1>
          <p>View and manage all users on the platform.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <label htmlFor="role-filter">Filter by role:</label>
            <select
              id="role-filter"
              className={styles.select}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Admins</option>
              {user.role === "superadmin" && <option value="superadmin">Superadmins</option>}
            </select>
          </div>
          <button className={styles.addButton}>Add New User</button>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    {/* Only allow role changes if user has permission */}
                    {user.role === "superadmin" ||
                    (user.role === "admin" && !["admin", "superadmin"].includes(u.role)) ? (
                      <select
                        className={styles.roleSelect}
                        defaultValue={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      >
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                        {user.role === "superadmin" && <option value="superadmin">Superadmin</option>}
                      </select>
                    ) : (
                      <span className={styles.roleText}>{u.role}</span>
                    )}
                  </td>
                  <td>{u.joinDate}</td>
                  <td>
                    {/* Only show delete button if user has permission */}
                    {(user.role === "superadmin" ||
                      (user.role === "admin" && !["admin", "superadmin"].includes(u.role))) && (
                      <button className={styles.deleteButton} onClick={() => handleDeleteUser(u.id)}>
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
