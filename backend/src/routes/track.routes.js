import express from 'express';
import { body } from 'express-validator';
import { createTrack, getAllTracks } from '../controllers/track.controller.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/tracks - Create track
router.post('/', protect, body('title').notEmpty(), createTrack);

// GET /api/tracks - List tracks
router.get('/', getAllTracks);

export default router;
