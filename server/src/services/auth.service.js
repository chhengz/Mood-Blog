import crypto from "crypto";
import { User } from "../models/index.js";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.utils.js";

// Login
export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await user.validatePassword(password);
  if (!isMatch) throw new Error("Invalid email or password");

  const { accessToken, refreshToken } = generateTokens(user);
  user.refreshToken = refreshToken;
  await user.save();

  return { user: user.toSafeJSON(), accessToken, refreshToken };
};

// Refresh token
export const refreshTokens = async (token) => {
  // Verify the refresh token
  const decoded = verifyRefreshToken(token);
  
  // Find user and validate stored refresh token
  const user = await User.findByPk(decoded.userId);
  if (!user || user.refreshToken !== token) {
    throw new Error("Invalid refresh token");
  }

  // Generate new tokens
  const { accessToken, refreshToken } = generateTokens(user);
  
  // Update stored refresh token
  user.refreshToken = refreshToken;
  await user.save();

  return { accessToken, refreshToken };
};

// Request password reset
export const requestPasswordReset = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // 1 hour

  await user.update({ resetToken, resetTokenExpiry });
  return { resetToken }; // email in production
};

// Reset password
export const resetPassword = async (token, newPassword) => {
  const user = await User.findOne({ where: { resetToken: token } });
  if (!user || user.resetTokenExpiry < Date.now())
    throw new Error("Invalid or expired reset token");

  user.password = newPassword;
  user.resetToken = null;
  user.resetTokenExpiry = null;
  await user.save();

  return { message: "Password has been reset" };
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    path: "/api/auth/refresh-token",
  });
  res.json({ message: "Logged out successfully" });
};
