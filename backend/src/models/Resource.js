import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lesson',
      required: true,
    },
    type: {
      type: String,
      enum: ['pdf', 'doc', 'link', 'note', 'assignment'],
      required: true,
    },
    title: { type: String, required: true },
    url: { type: String }, // for files or links
    content: { type: String }, // for notes or assignments
  },
  { timestamps: true }
);

export default mongoose.model('Resource', resourceSchema);
