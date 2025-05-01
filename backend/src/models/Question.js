import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quiz',
      required: true,
    },
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
    explanation: String, // optional feedback or answer explanation
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'medium',
    },
    isAIgenerated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Question', questionSchema);
