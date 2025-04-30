import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';

/**
 * @desc Enroll student in a course
 * @route POST /api/enrollments/:courseId
 * @access Student (auth required)
 */
export const enrollInCourse = async (req, res) => {
  const studentId = req.user.id;
  const courseId = req.params.courseId;

  try {
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    // Prevent duplicate enrollment
    const alreadyEnrolled = await Enrollment.findOne({
      student: studentId,
      course: courseId,
    });
    if (alreadyEnrolled)
      return res.status(400).json({ message: 'Already enrolled' });

    // Create new enrollment
    const enrollment = await Enrollment.create({
      student: studentId,
      course: courseId,
    });
    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all courses a student is enrolled in
 * @route GET /api/enrollments/my
 * @access Student (auth required)
 */
export const getMyEnrollments = async (req, res) => {
  const studentId = req.user.id;

  try {
    const enrollments = await Enrollment.find({ student: studentId }).populate(
      'course'
    );
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
