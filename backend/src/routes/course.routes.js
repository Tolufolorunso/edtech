import express from 'express';
import { body } from 'express-validator';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

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

router.patch(
  '/:id',
  protect,
  requireRole(['instructor', 'admin', 'superadmin']),
  updateCourse
);

// GET /api/courses/:id - private
router.delete(
  '/:id',
  protect,
  requireRole(['instructor', 'admin', 'superadmin']),
  deleteCourse
);

export default router;
