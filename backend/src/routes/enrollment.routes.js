import express from 'express';
import {
  enrollInCourse,
  getMyEnrollments,
} from '../controllers/enrollment.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/enrollments/:courseId - Enroll in course
router.post('/:courseId', protect, enrollInCourse);

// GET /api/enrollments/my - View all enrollments
router.get('/my', protect, getMyEnrollments);

export default router;
