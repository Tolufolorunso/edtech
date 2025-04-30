import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    content: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    position: Number,
  },
  { timestamps: true }
);

export default mongoose.model('Lesson', lessonSchema);
