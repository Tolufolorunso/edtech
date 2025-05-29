import express from 'express';
import {
  createBootcamp,
  getAllBootcamps,
  getBootcampById,
} from '../controllers/bootcamp.controller.js';
import { protect } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/', getAllBootcamps);

router.post(
  '/',
  protect,
  requireRole(['instructor', 'admin', 'superadmin']),
  createBootcamp
);

// GET one by ID
router.get('/:id', getBootcampById);

export default router;
