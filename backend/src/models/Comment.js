import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: { type: String, required: true },
    parent: {
      // for replies
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
    roleAtPostTime: {
      // lock user role even if they get promoted later
      type: String,
      enum: ['student', 'instructor', 'admin', 'superadmin'],
      required: true,
    },
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    reported: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('Comment', commentSchema);
