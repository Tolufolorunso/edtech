import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    tracks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Track' }],
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPremium: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
