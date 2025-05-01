import User from '../models/User.js';

/**
 * @desc Get all users
 * @route GET /api/admin/users
 * @access Admin+
 */
export const getAllUsers = async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
};

/**
 * @desc Promote a user to a role
 * @route PUT /api/admin/promote/:userId
 * @access Admin/SuperAdmin
 */
export const promoteUser = async (req, res) => {
  const { role } = req.body;
  const user = await User.findById(req.params.userId);

  if (!user) return res.status(404).json({ message: 'User not found' });

  const requesterRole = req.user.role;

  // Only superadmin can assign admin or superadmin
  if (
    ['admin', 'superadmin'].includes(role) &&
    requesterRole !== 'superadmin'
  ) {
    return res
      .status(403)
      .json({ message: 'Only superadmin can assign admin roles' });
  }

  user.role = role;
  await user.save();

  res.json({ message: `User promoted to ${role}` });
};

/**
 * @desc Delete a user
 * @route DELETE /api/admin/users/:userId
 * @access Admin+/SuperAdmin
 */
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  if (user.role === 'admin' && req.user.role !== 'superadmin') {
    return res
      .status(403)
      .json({ message: 'Only superadmin can delete an admin' });
  }

  await user.deleteOne();
  res.json({ message: 'User deleted' });
};
