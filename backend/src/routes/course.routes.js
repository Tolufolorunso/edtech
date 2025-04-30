import express from 'express';
import { body } from 'express-validator';
import {
  createCourse,
  getAllCourses,
  getCourseById,
} from '../controllers/course.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/courses - Instructor only
router.post(
  '/',
  protect, // middleware: user must be logged in
  body('title').notEmpty(),
  body('trackId').notEmpty(),
  createCourse
);

// GET /api/courses - Public
router.get('/', getAllCourses);

// GET /api/courses/:id - Public
router.get('/:id', getCourseById);

export default router;
