import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import {
  getAllUsers,
  promoteUser,
  deleteUser,
} from '../controllers/admin.controller.js';

const router = express.Router();

// View all users
router.get(
  '/users',
  protect,
  requireRole(['admin', 'superadmin']),
  getAllUsers
);

// Promote user
router.put(
  '/promote/:userId',
  protect,
  requireRole(['admin', 'superadmin']),
  promoteUser
);

// Delete user
router.delete(
  '/users/:userId',
  protect,
  requireRole(['admin', 'superadmin']),
  deleteUser
);

export default router;
