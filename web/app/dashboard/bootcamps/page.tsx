'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard/layout';
import { useAuthStore } from '@/store/auth-store';
import styles from './bootcamps.module.css';
import { useEffect } from 'react';
import { useBootcampStore } from '@/store/bootcamp-store';

export default function BootcampsManagementPage() {
  const { user } = useAuthStore();
  const { bootcampMap, getAllBootcamps, isLoading, error } = useBootcampStore(
    (state) => state
  );
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getAllBootcamps();
  }, []);

  // Check if user has instructor permissions
  if (!user || !['instructor', 'admin', 'superadmin'].includes(user.role)) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.unauthorized}>
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Filter bootcamps based on user role and selected filter
  const filteredBootcamps = (() => {
    let filtered = bootcampMap || [];

    if (user?.role === 'instructor') {
      filtered = filtered.filter((bootcamp) => {
        console.log(bootcamp);
        bootcamp.instructors?.includes(user?.id);
      });
    }

    if (filter === 'published') {
      return filtered.filter((bootcamp) => bootcamp.isPublished);
    } else if (filter === 'draft') {
      return filtered.filter((bootcamp) => !bootcamp.isPublished);
    }

    return filtered;
  })();

  // Add this near the top of your component's JSX:
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.loading}>Loading bootcamps...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.container}>
          <div className={styles.error}>
            Error loading bootcamps: {error}
            <button onClick={getAllBootcamps}>Retry</button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Handle bootcamp deletion
  const handleDeleteBootcamp = (bootcampId: string) => {
    console.log(`Deleting bootcamp ${bootcampId}`);
  };

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Bootcamp Management</h1>
          <p>Create, edit, and manage your intensive bootcamp programs.</p>
        </div>

        <div className={styles.controls}>
          <div className={styles.filters}>
            <label htmlFor="status-filter">Filter by status:</label>
            <select
              id="status-filter"
              className={styles.select}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Bootcamps</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <Link href="/dashboard/bootcamps/create" className={styles.addButton}>
            Create New Bootcamp
          </Link>
        </div>

        {filteredBootcamps.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏕️</div>
            <h3>No bootcamps found</h3>
            <p>
              {user.role === 'instructor'
                ? "You haven't created any bootcamps yet. Get started by creating your first bootcamp."
                : 'No bootcamps match your current filter. Try changing your filter or create a new bootcamp.'}
            </p>
            <Link
              href="/dashboard/bootcamps/create"
              className={styles.createButton}
            >
              Create Bootcamp
            </Link>
          </div>
        ) : (
          <div className={styles.bootcampGrid}>
            {filteredBootcamps.map((bootcamp) => (
              <div key={bootcamp.id} className={styles.bootcampCard}>
                <div className={styles.bootcampImageContainer}>
                  <Image
                    src={
                      bootcamp.thumbnail ||
                      `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                        bootcamp.title
                      )}`
                    }
                    alt={bootcamp.title}
                    width={600}
                    height={400}
                    className={styles.bootcampImage}
                  />
                  <div className={styles.bootcampStatus}>
                    {bootcamp.isPublished ? 'Published' : 'Draft'}
                  </div>
                </div>
                <div className={styles.bootcampContent}>
                  <h3 className={styles.bootcampTitle}>{bootcamp.title}</h3>
                  <p className={styles.bootcampDescription}>
                    {bootcamp.description?.substring(0, 100)}
                    {bootcamp.description && bootcamp.description.length > 100
                      ? '...'
                      : ''}
                  </p>
                  <div className={styles.bootcampInfo}>
                    <span>{bootcamp.duration}</span>
                    <span>Level: {bootcamp.level}</span>
                  </div>
                  <div className={styles.bootcampWeeks}>
                    <span>{bootcamp.weeks?.length || 0} Weeks Planned</span>
                  </div>
                  <div className={styles.bootcampActions}>
                    <Link
                      href={`/dashboard/bootcamps/edit/${bootcamp.id}`}
                      className={styles.editButton}
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/dashboard/bootcamps/weeks/${bootcamp.id}`}
                      className={styles.weeksButton}
                    >
                      Manage Weeks
                    </Link>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteBootcamp(bootcamp.id)}
                    >
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
  );
}
