import Resource from '../models/Resource.js';
import Lesson from '../models/Lesson.js';

/**
 * @desc Add a resource to a lesson
 * @route POST /api/resources/:lessonId
 * @access Instructor
 */
export const addResource = async (req, res) => {
  const { type, title, url, content } = req.body;
  const { lessonId } = req.params;

  try {
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

    const resource = await Resource.create({
      lesson: lessonId,
      type,
      title,
      url,
      content,
    });

    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * @desc Get all resources for a lesson
 * @route GET /api/resources/lesson/:lessonId
 * @access Public
 */
export const getResourcesByLesson = async (req, res) => {
  try {
    const resources = await Resource.find({ lesson: req.params.lessonId });
    res.json(resources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
