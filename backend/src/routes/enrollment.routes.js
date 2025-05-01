import express from 'express';
import {
  enroll,
  enrollInCourse,
  getMyEnrollments,
} from '../controllers/enrollment.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/enrollments/:courseId - Enroll in course
router.post('/:courseId', protect, enrollInCourse);

// GET /api/enrollments/my - View all enrollments
router.get('/my', protect, getMyEnrollments);

router.post('/', protect, enroll);

export default router;
