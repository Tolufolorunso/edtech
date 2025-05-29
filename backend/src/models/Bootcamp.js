import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    description: String,
    duration: String,
    url: String,
  },
  { _id: false }
);

const ResourceSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    type: String, // 'pdf', 'doc', 'link', 'note', 'assignment', 'github', etc.
    url: String,
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    id: Number,
    title: String,
    questions: Number,
    timeLimit: String,
    url: String,
  },
  { _id: false }
);

const LiveClassSchema = new mongoose.Schema(
  {
    date: String,
    time: String,
    instructor: String,
    topic: String,
    link: String,
    description: String,
  },
  { _id: false }
);

const WeekSchema = new mongoose.Schema(
  {
    weekNumber: Number,
    title: String,
    description: String,
    videos: [VideoSchema],
    resources: [ResourceSchema],
    liveClass: LiveClassSchema,
    quizzes: [QuizSchema],
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const BootcampSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    description: String,
    duration: String,
    schedule: String,
    startDate: String,
    isPublished: { type: Boolean, default: false },
    price: String,
    level: String,
    prerequisites: [String],
    image: String,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    instructors: [
      {
        name: String,
        role: String,
        bio: String,
        avatar: String,
      },
    ],
    curriculum: [WeekSchema],
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Bootcamp', BootcampSchema);
