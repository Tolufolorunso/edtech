import Image from "next/image"
import styles from "./testimonials.module.css"

// Mock testimonial data
const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Frontend Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The JavaScript Fundamentals course was exactly what I needed to kickstart my career. The instructor explained complex concepts in a way that was easy to understand.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "I completed the Full Stack JavaScript track and landed a job within two months. The project-based approach really helped me build a strong portfolio.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Mobile Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    content:
      "The React Native course was comprehensive and up-to-date. I appreciated the hands-on exercises and the responsive support from the instructor.",
    rating: 4,
  },
]

export default function Testimonials() {
  return (
    <div className={styles.testimonials}>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className={styles.testimonial}>
          <div className={styles.header}>
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              width={60}
              height={60}
              className={styles.avatar}
            />
            <div>
              <h3>{testimonial.name}</h3>
              <p className={styles.role}>{testimonial.role}</p>
            </div>
          </div>
          <div className={styles.rating}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < testimonial.rating ? styles.starFilled : styles.star}>
                ★
              </span>
            ))}
          </div>
          <p className={styles.content}>{testimonial.content}</p>
        </div>
      ))}
    </div>
  )
}
