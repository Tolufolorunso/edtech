import styles from "./quiz-list.module.css"

interface Quiz {
  id: number
  title: string
  questions: number
  timeLimit: string
  url: string
}

interface QuizListProps {
  quizzes: Quiz[]
}

export default function QuizList({ quizzes }: QuizListProps) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Week Quizzes</h2>
      <p className={styles.description}>Test your knowledge with these quizzes to reinforce what you've learned.</p>

      <div className={styles.quizList}>
        {quizzes.map((quiz) => (
          <div key={quiz.id} className={styles.quizCard}>
            <div className={styles.quizInfo}>
              <h3 className={styles.quizTitle}>{quiz.title}</h3>
              <div className={styles.quizMeta}>
                <div className={styles.quizMetaItem}>
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
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  <span>{quiz.timeLimit}</span>
                </div>
                <div className={styles.quizMetaItem}>
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
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>{quiz.questions} questions</span>
                </div>
              </div>
            </div>

            <a href={quiz.url} target="_blank" rel="noopener noreferrer" className={styles.startButton}>
              Start Quiz
            </a>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <div className={styles.noteIcon}>
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
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <div className={styles.noteText}>
          Quizzes are not graded but are designed to help you assess your understanding of the material. You can retake
          them as many times as you need.
        </div>
      </div>
    </div>
  )
}
