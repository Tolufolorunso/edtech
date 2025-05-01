import express from 'express';
import {
  addResource,
  deleteResource,
  getResourcesByLesson,
} from '../controllers/resource.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { body } from 'express-validator';

const router = express.Router();

// POST /api/resources/:lessonId - Add resource to a lesson
router.post(
  '/:lessonId',
  protect,
  body('type').isIn(['pdf', 'doc', 'link', 'note', 'assignment']),
  body('title').notEmpty(),
  addResource
);

// GET /api/resources/lesson/:lessonId - Get all resources for a lesson
router.get('/lesson/:lessonId', getResourcesByLesson);

router.delete('/:id', protect, deleteResource);

export default router;
