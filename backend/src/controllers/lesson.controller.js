import Course from '../models/Course.js';
import Lesson from '../models/Lesson.js';

/**
 * @desc Get all lessons in a course
 * @route GET /api/lessons/course/:courseId
 * @access Public
 */
export const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort({
      position: 1,
    }); // ascending by order
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get a single lesson by ID
 * @route GET /api/lessons/:lessonId
 * @access Public
 */
export const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Create a lesson for a course
 * @route POST /api/lessons/:courseId
 * @access Instructor (auth required)
 */
export const createLesson = async (req, res) => {
  const { title, videoUrl, content, position } = req.body;
  const { courseId } = req.params;

  try {
    // Verify the course exists and belongs to this instructor
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.instructor.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: 'Not authorized to add lessons to this course' });
    }

    // Create the lesson
    const lesson = await Lesson.create({
      title,
      videoUrl,
      content,
      position,
      course: courseId,
    });

    res.status(201).json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
