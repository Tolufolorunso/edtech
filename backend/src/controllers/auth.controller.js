import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken } from '../utils/token.js';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/email.js';

export const register = async (req, res) => {
  let { name, email, password, role, bootcamp } = req.body;

  role = role ? role : 'student';

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    let message = errors
      .array()
      .map((err) => `${err.path}: ${err.msg}`)
      .join(', ');

    return res.status(400).json({ message });
  }

  try {
    // Prevent unwanted roles
    if (role && ['admin', 'superadmin'].includes(role)) {
      return res.status(403).json({ message: 'Unauthorized role assignment' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'user exists' });

    const newUser = await User.create({
      name,
      email,
      password,
      bootcamp,
      role: role === 'instructor' ? 'instructor' : 'student',
    });

    res.status(201).json({
      status: true,
      message: 'User created successfully',
    });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(user);
  console.log(token);

  res.json({ status: true, token, user, message: 'Login successful' });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  const token = crypto.randomBytes(32).toString('hex');
  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 mins
  await user.save();

  sendResetEmail(user.email, token);
  res.json({ status: true, message: 'Reset email sent (check console)' });
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: 'Invalid or expired token' });

  user.password = newPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  res.json({ message: 'Password reset successful' });
};
