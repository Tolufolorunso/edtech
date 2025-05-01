import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    track: { type: mongoose.Schema.Types.ObjectId, ref: 'Track' },
    enrolledAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model('Enrollment', enrollmentSchema);
