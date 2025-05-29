import type { Quiz } from "@/store/lesson-store"
import styles from "./quiz-list.module.css"

interface QuizListProps {
  quizzes: Quiz[]
}

export default function QuizList({ quizzes }: QuizListProps) {
  if (quizzes.length === 0) {
    return <div className={styles.empty}>No quizzes available for this lesson.</div>
  }

  return (
    <div className={styles.quizList}>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className={styles.quizItem}>
          <div className={styles.quizHeader}>
            <h3 className={styles.quizTitle}>{quiz.title}</h3>
            {quiz.isAIgenerated && <span className={styles.aiBadge}>AI Generated</span>}
          </div>
          {quiz.description && <p className={styles.quizDescription}>{quiz.description}</p>}
          <button className={styles.startButton}>Start Quiz</button>
        </div>
      ))}
    </div>
  )
}
