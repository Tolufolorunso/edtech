import Course from '../models/Course.js';
import Track from '../models/Track.js';

/**
 * @desc Create a new course (Instructor only)
 * @route POST /api/courses
 */
export const createCourse = async (req, res) => {
  const { title, description, trackIds } = req.body;

  try {
    // Validate that each track exists
    const tracks = await Track.find({ _id: { $in: trackIds } });
    if (tracks.length !== trackIds.length) {
      return res
        .status(400)
        .json({ message: 'One or more trackIds are invalid' });
    }

    // Create the course and associate it with instructor (req.user.id)
    const course = await Course.create({
      title,
      description,
      tracks: trackIds,
      instructor: req.user.id,
    });

    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all courses (public)
 * @route GET /api/courses
 */
export const getAllCourses = async (req, res) => {
  try {
    // Populate track and instructor fields with data
    const courses = await Course.find().populate(
      'tracks instructor',
      'title name email'
    );
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get a single course by ID
 * @route GET /api/courses/:id
 */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'tracks instructor',
      'title name email'
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
