import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import Track from '../models/Track.js';

/**
 * @desc Enroll in a course or track
 * @route POST /api/enrollments
 * @access Student
 */
export const enroll = async (req, res) => {
  const { courseId, trackId } = req.body;
  const studentId = req.user.id;

  try {
    if (!courseId && !trackId) {
      return res
        .status(400)
        .json({ message: 'Course or Track ID is required' });
    }

    // Handle course enrollment
    if (courseId) {
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      // Check if course is premium and student is subscribed
      if (course.isPremium && !req.user.hasSubscription) {
        return res
          .status(403)
          .json({ message: 'Subscription required for this course' });
      }

      // Prevent duplicate course enrollment
      const exists = await Enrollment.findOne({
        student: studentId,
        course: courseId,
      });
      if (exists)
        return res
          .status(400)
          .json({ message: 'Already enrolled in this course' });

      const enrollment = await Enrollment.create({
        student: studentId,
        course: courseId,
      });
      return res.status(201).json(enrollment);
    }

    // Handle track enrollment
    if (trackId) {
      if (!req.user.hasSubscription) {
        return res
          .status(403)
          .json({ message: 'Subscription required for tracks' });
      }

      const track = await Track.findById(trackId);
      if (!track) return res.status(404).json({ message: 'Track not found' });

      const exists = await Enrollment.findOne({
        student: studentId,
        track: trackId,
      });
      if (exists)
        return res
          .status(400)
          .json({ message: 'Already enrolled in this track' });

      const enrollment = await Enrollment.create({
        student: studentId,
        track: trackId,
      });
      return res.status(201).json(enrollment);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
