import User from '../models/User.js';
import Lesson from '../models/Lesson.js';
import Course from '../models/Course.js';

/**
 * @desc Mark a lesson as completed
 * @route POST /api/progress/lesson/:lessonId
 * @access Student
 */
export const completeLesson = async (req, res) => {
  const { lessonId } = req.params;
  const user = await User.findById(req.user.id);

  if (user.completedLessons.includes(lessonId)) {
    return res.status(400).json({ message: 'Lesson already marked complete' });
  }

  user.completedLessons.push(lessonId);
  await user.save();

  // Check if entire course is now completed
  const lesson = await Lesson.findById(lessonId);
  const allLessons = await Lesson.find({ course: lesson.course });
  const completedForThisCourse = allLessons.every((lesson) =>
    user.completedLessons.map(String).includes(lesson._id.toString())
  );

  if (completedForThisCourse) {
    if (!user.completedCourses.includes(lesson.course)) {
      user.completedCourses.push(lesson.course);
      await user.save();
    }
  }

  res.json({ message: 'Lesson marked as complete' });
};

/**
 * @desc Get user progress for a course
 * @route GET /api/progress/course/:courseId
 */
export const getCourseProgress = async (req, res) => {
  const { courseId } = req.params;
  const lessons = await Lesson.find({ course: courseId });
  const user = await User.findById(req.user.id);

  const completed = lessons.filter((lesson) =>
    user.completedLessons.map(String).includes(lesson._id.toString())
  );

  const progress = Math.round((completed.length / lessons.length) * 100);

  res.json({
    total: lessons.length,
    completed: completed.length,
    progress: progress,
  });
};

export const getCertificateEligibility = async (req, res) => {
  const { courseId } = req.params;
  const user = await User.findById(req.user.id);

  const eligible = user.completedCourses.includes(courseId);

  res.json({
    courseId,
    eligible,
    message: eligible ? 'Eligible for certificate' : 'Course not yet completed',
  });
};
