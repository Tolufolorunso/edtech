'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth-store';
import { useEnrollmentStore } from '@/store/enrollment-store';
import { useCoursesStore } from '@/store/courses-store';
import { useTracksStore } from '@/store/tracks-store';
import type { Course } from '@/store/courses-store';
import type { Track } from '@/store/tracks-store';
import DashboardLayout from '@/components/dashboard/layout';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuthStore();
  const { enrollments, fetchEnrollments } = useEnrollmentStore();
  const { courses, fetchCourses } = useCoursesStore();
  const { tracks, fetchTracks } = useTracksStore();

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [enrolledTracks, setEnrolledTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      const loadData = async () => {
        setIsLoading(true);
        await Promise.all([fetchEnrollments(), fetchCourses(), fetchTracks()]);
        setIsLoading(false);
      };

      loadData();
    }
  }, [isAuthenticated, fetchEnrollments, fetchCourses, fetchTracks]);

  useEffect(() => {
    if (courses.length > 0 && tracks.length > 0 && enrollments.length > 0) {
      // Get enrolled courses
      const courseEnrollments = enrollments.filter((e) => e.course);
      const userEnrolledCourses = courses.filter((course) =>
        courseEnrollments.some((e) => e.course === course._id)
      );
      setEnrolledCourses(userEnrolledCourses);

      // Get enrolled tracks
      const trackEnrollments = enrollments.filter((e) => e.track);
      const userEnrolledTracks = tracks.filter((track) =>
        trackEnrollments.some((e) => e.track === track._id)
      );
      setEnrolledTracks(userEnrolledTracks);
    }
  }, [courses, tracks, enrollments]);

  if (!user) {
    return null;
  }

  // Render different dashboard content based on user role
  const renderRoleBasedContent = () => {
    switch (user.role) {
      case 'student':
        return renderStudentDashboard();
      case 'instructor':
        return renderInstructorDashboard();
      case 'admin':
      case 'superadmin':
        return renderAdminDashboard();
      default:
        return renderStudentDashboard();
    }
  };

  // Student dashboard view
  const renderStudentDashboard = () => (
    <>
      <div className={styles.header}>
        <h1>Welcome, {user.name}!</h1>
        <p>
          This is your learning dashboard. Start or continue your courses below.
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>{enrolledCourses.length}</h3>
          <p>Enrolled Courses</p>
        </div>
        <div className={styles.statCard}>
          <h3>{enrolledTracks.length}</h3>
          <p>Enrolled Tracks</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Certificates Earned</p>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.loading}>Loading your enrollments...</div>
      ) : (
        <>
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Your Courses</h2>
              <Link href="/courses" className={styles.viewAll}>
                Browse All Courses
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📚</div>
                <h3>No courses yet</h3>
                <p>
                  You haven't enrolled in any courses yet. Browse our catalog to
                  get started.
                </p>
                <Link href="/courses" className={styles.browseButton}>
                  Browse Courses
                </Link>
              </div>
            ) : (
              <div className={styles.enrolledGrid}>
                {enrolledCourses.map((course) => (
                  <Link
                    key={course._id}
                    href={`/courses/${course._id}`}
                    className={styles.enrolledCard}
                  >
                    <div className={styles.cardThumbnail}>
                      <Image
                        src={
                          course.thumbnail ||
                          `/placeholder.svg?height=400&width=600&text=${
                            encodeURIComponent(course.title) || 'Course'
                          }`
                        }
                        alt={course.title}
                        width={600}
                        height={400}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{course.title}</h3>
                      <div className={styles.cardMeta}>
                        <span>0% Complete</span>
                        <span className={styles.continueButton}>
                          Continue →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Your Tracks</h2>
              <Link href="/tracks" className={styles.viewAll}>
                Browse All Tracks
              </Link>
            </div>

            {enrolledTracks.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🛤️</div>
                <h3>No tracks yet</h3>
                <p>
                  You haven't enrolled in any learning tracks yet. Tracks
                  provide a structured learning path.
                </p>
                <Link href="/tracks" className={styles.browseButton}>
                  Browse Tracks
                </Link>
              </div>
            ) : (
              <div className={styles.enrolledGrid}>
                {enrolledTracks.map((track) => (
                  <Link
                    key={track._id}
                    href={`/tracks/${track._id}`}
                    className={styles.enrolledCard}
                  >
                    <div className={styles.cardThumbnail}>
                      <Image
                        src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(
                          track.title
                        )}`}
                        alt={track.title}
                        width={600}
                        height={400}
                        className={styles.cardImage}
                      />
                    </div>
                    <div className={styles.cardContent}>
                      <h3>{track.title}</h3>
                      <div className={styles.cardMeta}>
                        <span>0% Complete</span>
                        <span className={styles.continueButton}>
                          Continue →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </>
  );

  // Instructor dashboard view
  const renderInstructorDashboard = () => (
    <>
      <div className={styles.header}>
        <h1>Instructor Dashboard</h1>
        <p>Manage your courses, lessons, and educational content.</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>
            {courses.filter((course) => course.instructor === user.id).length}
          </h3>
          <p>Your Courses</p>
        </div>
        <div className={styles.statCard}>
          <h3>{tracks.filter((track) => track.creator === user.id).length}</h3>
          <p>Your Tracks</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Total Students</p>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Quick Actions</h2>
        <div className={styles.actionGrid}>
          <Link href="/dashboard/courses/create" className={styles.actionCard}>
            <div className={styles.actionIcon}>📚</div>
            <h3>Create Course</h3>
            <p>Add a new course to your catalog</p>
          </Link>
          <Link href="/dashboard/lessons/create" className={styles.actionCard}>
            <div className={styles.actionIcon}>���</div>
            <h3>Add Lesson</h3>
            <p>Create new lesson content</p>
          </Link>
          <Link href="/dashboard/tracks/create" className={styles.actionCard}>
            <div className={styles.actionIcon}>🧭</div>
            <h3>Create Track</h3>
            <p>Build a learning path</p>
          </Link>
          <Link
            href="/dashboard/bootcamps/create"
            className={styles.actionCard}
          >
            <div className={styles.actionIcon}>🏕️</div>
            <h3>Create Bootcamp</h3>
            <p>Design an intensive learning program</p>
          </Link>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Your Recent Courses</h2>
          <Link href="/dashboard/courses" className={styles.viewAll}>
            View All
          </Link>
        </div>

        {courses.filter((course) => course.instructor === user.id).length ===
        0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📚</div>
            <h3>No courses yet</h3>
            <p>
              You haven't created any courses yet. Get started by creating your
              first course.
            </p>
            <Link
              href="/dashboard/courses/create"
              className={styles.browseButton}
            >
              Create Course
            </Link>
          </div>
        ) : (
          <div className={styles.enrolledGrid}>
            {courses
              .filter((course) => course.instructor === user.id)
              .slice(0, 3)
              .map((course) => (
                <Link
                  key={course._id}
                  href={`/dashboard/courses/edit/${course._id}`}
                  className={styles.enrolledCard}
                >
                  <div className={styles.cardThumbnail}>
                    <Image
                      src={
                        course.thumbnail ||
                        `/placeholder.svg?height=400&width=600&text=${
                          encodeURIComponent(course.title) || 'Course'
                        }`
                      }
                      alt={course.title}
                      width={600}
                      height={400}
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardContent}>
                    <h3>{course.title}</h3>
                    <div className={styles.cardMeta}>
                      <span>{course.lessons?.length || 0} Lessons</span>
                      <span className={styles.continueButton}>Edit →</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </>
  );

  // Admin dashboard view
  const renderAdminDashboard = () => (
    <>
      <div className={styles.header}>
        <h1>{user.role === 'superadmin' ? 'Superadmin' : 'Admin'} Dashboard</h1>
        <p>Manage platform content, users, and settings.</p>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>{courses.length}</h3>
          <p>Total Courses</p>
        </div>
        <div className={styles.statCard}>
          <h3>{tracks.length}</h3>
          <p>Total Tracks</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Total Users</p>
        </div>
        <div className={styles.statCard}>
          <h3>0</h3>
          <p>Total Bootcamps</p>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Administrative Actions</h2>
        <div className={styles.actionGrid}>
          <Link href="/dashboard/users" className={styles.actionCard}>
            <div className={styles.actionIcon}>👥</div>
            <h3>Manage Users</h3>
            <p>View and manage user accounts</p>
          </Link>
          <Link href="/dashboard/courses" className={styles.actionCard}>
            <div className={styles.actionIcon}>📚</div>
            <h3>Manage Courses</h3>
            <p>Review and moderate all courses</p>
          </Link>
          <Link href="/dashboard/bootcamps" className={styles.actionCard}>
            <div className={styles.actionIcon}>🏕️</div>
            <h3>Manage Bootcamps</h3>
            <p>Review and moderate bootcamps</p>
          </Link>
          {user.role === 'superadmin' && (
            <Link href="/dashboard/settings" className={styles.actionCard}>
              <div className={styles.actionIcon}>⚙️</div>
              <h3>Platform Settings</h3>
              <p>Configure global platform settings</p>
            </Link>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Recent Activity</h2>
        </div>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>📚</div>
            <div className={styles.activityContent}>
              <h4>New Course Created</h4>
              <p>JavaScript Fundamentals was created by Jane Smith</p>
              <span className={styles.activityTime}>2 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>👤</div>
            <div className={styles.activityContent}>
              <h4>New User Registration</h4>
              <p>John Doe joined the platform</p>
              <span className={styles.activityTime}>5 hours ago</span>
            </div>
          </div>
          <div className={styles.activityItem}>
            <div className={styles.activityIcon}>🏕️</div>
            <div className={styles.activityContent}>
              <h4>Bootcamp Updated</h4>
              <p>React Native Bootcamp was updated by Jane Smith</p>
              <span className={styles.activityTime}>1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      <div className={styles.container}>{renderRoleBasedContent()}</div>
    </DashboardLayout>
  );
}
