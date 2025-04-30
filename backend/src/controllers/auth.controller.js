import { validationResult } from 'express-validator';
import User from '../models/User.js';
import { generateToken } from '../utils/token.js';
import crypto from 'crypto';
import { sendResetEmail } from '../utils/email.js';

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, password, role } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists)
    return res.status(400).json({ message: 'Invalid credentials' });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ token: generateToken(user), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ token: generateToken(user), user });
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
  res.json({ message: 'Reset email sent (check console)' });
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
