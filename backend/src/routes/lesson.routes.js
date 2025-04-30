import express from 'express';
import { body } from 'express-validator';

import {
  getLessonsByCourse,
  getLessonById,
  createLesson,
} from '../controllers/lesson.controller.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get all lessons for a course
router.get('/course/:courseId', getLessonsByCourse);

// Get a specific lesson
router.get('/:lessonId', getLessonById);

// POST /api/lessons/:courseId - Instructor adds a lesson
router.post(
  '/:courseId',
  protect,
  body('title').notEmpty(),
  body('videoUrl').notEmpty(),
  createLesson
);

export default router;
