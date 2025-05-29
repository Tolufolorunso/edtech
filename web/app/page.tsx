import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import FeaturedCourses from '@/components/home/featured-courses';
import TracksList from '@/components/home/tracks-list';
import Testimonials from '@/components/home/testimonials';
import styles from './page.module.css';

export default function Home() {
  if (true) {
    return redirect('/bootcamp');
  }
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <h1>Master JavaScript Development</h1>
            <p>
              From core JavaScript to fullstack React Native development,
              including Prompt Engineering and AI-powered learning.
            </p>
            <div className={styles.heroCta}>
              <Link href="/courses" className={styles.primaryButton}>
                Explore Courses
              </Link>
              <Link href="/tracks" className={styles.secondaryButton}>
                View Learning Tracks
              </Link>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="EdTech Learning Platform"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Featured Courses</h2>
            <Link href="/courses" className={styles.viewAll}>
              View All Courses
            </Link>
          </div>
          <Suspense
            fallback={<div className={styles.loading}>Loading courses...</div>}
          >
            <FeaturedCourses />
          </Suspense>
        </div>
      </section>

      {/* Learning Tracks Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2>Learning Tracks</h2>
            <Link href="/tracks" className={styles.viewAll}>
              View All Tracks
            </Link>
          </div>
          <Suspense
            fallback={<div className={styles.loading}>Loading tracks...</div>}
          >
            <TracksList />
          </Suspense>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <h2>Why Choose EdTech?</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🎓</div>
              <h3>Expert Instructors</h3>
              <p>Learn from industry professionals with years of experience.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🚀</div>
              <h3>Project-Based Learning</h3>
              <p>
                Apply your knowledge with real-world projects and assignments.
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔴</div>
              <h3>Live Classes</h3>
              <p>Join interactive live sessions with instructors and peers.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🤖</div>
              <h3>AI-Powered Learning</h3>
              <p>
                Enhance your learning with AI-generated quizzes and feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2>What Our Students Say</h2>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <h2>Ready to Start Your Learning Journey?</h2>
          <p>Join thousands of students already learning on our platform.</p>
          <Link href="/register" className={styles.primaryButton}>
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
}
