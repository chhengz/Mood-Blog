import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Post, User } from "../models/index.js";
import { verifyAccessToken, verifyRefreshToken } from "../utils/jwt.utils.js";
import { getTokenFromHeader } from "../middleware/auth.middleware.js";

dotenv.config();
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;


// Create a new user (registration)
export const createUser = async (userData) => {
  const user = await User.create(userData);
  return user.toSafeJSON();
};


// Get all users
export const getAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password", "refreshToken"] },
  });
};

// Get user by ID
export const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");
  return user.toSafeJSON();
};

// Get profile from access token

export const getUserProfile = async (req) => {
  const token = getTokenFromHeader(req);
    const decoded = verifyAccessToken(token);
  
    const user = await User.findByPk(decoded.userId, {
      include: [
        {
          model: Post,
          as: "LikedPosts",
          attributes: [
            "id",
            "title",
            "slug",
            "coverImage",
            "excerpt",
            "createdAt",
            "likes",
          ],
          through: { attributes: [] },
        },
      ],
      attributes: { exclude: ["password", "refreshToken"] },
    });
  
    if (!user) throw new Error("User not found");
    return user;
};

// Update user profile
export const updateUser = async (id, updates) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update(updates);
  return user.toSafeJSON();
};

// Change password
// export const changePassword = async (id, oldPassword, newPassword) => {
//   const user = await User.findByPk(id);
//   if (!user) throw new Error("User not found");

//   const isMatch = await user.validatePassword(oldPassword);
//   if (!isMatch) throw new Error("Old password incorrect");

//   user.password = newPassword; // gets hashed via hook
//   await user.save();
//   return { message: "Password updated successfully" };
// };

// Request password reset
// export const requestPasswordReset = async (email) => {
//   const user = await User.findOne({ where: { email } });
//   if (!user) throw new Error("User not found");

//   const resetToken = crypto.randomBytes(32).toString("hex");
//   const resetTokenExpiry = Date.now() + 3600000; // 1 hour

//   await user.update({ resetToken, resetTokenExpiry });
//   return { resetToken }; // in production, email this instead
// };

// Reset password
// export const resetPassword = async (token, newPassword) => {
//   const user = await User.findOne({ where: { resetToken: token } });
//   if (!user || user.resetTokenExpiry < Date.now()) {
//     throw new Error("Invalid or expired reset token");
//   }

//   user.password = newPassword;
//   user.resetToken = null;
//   user.resetTokenExpiry = null;
//   await user.save();

//   return { message: "Password has been reset" };
// };

// Soft delete (deactivate user)
export const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw new Error("User not found");

  user.status = false;
  await user.save();

  return { message: "User deactivated successfully" };
};
