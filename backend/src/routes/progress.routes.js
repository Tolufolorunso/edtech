import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import {
  completeLesson,
  getCertificateEligibility,
  getCourseProgress,
} from '../controllers/progress.controller.js';

const router = express.Router();

// Mark a lesson complete
router.post('/lesson/:lessonId', protect, completeLesson);

// View course progress
router.get('/course/:courseId', protect, getCourseProgress);

router.get('/certificate/:courseId', protect, getCertificateEligibility);

export default router;
