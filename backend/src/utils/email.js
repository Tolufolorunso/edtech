export const sendResetEmail = (email, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  console.log(`📧 Password reset link for ${email}: ${resetLink}`);
};
