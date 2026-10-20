import { User } from "../models/index.js";
import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";
import { getTokenFromHeader } from "../middleware/auth.middleware.js";
import { getUserProfile_test } from "../tests/users.test.js";
import { generateAccessToken, generateTokens } from "../utils/jwt.utils.js";

// Helper: check validation errors
const validate = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map((e) => e.msg).join(", ");
    throw new Error(msg);
  }
};


// ----------------------
// GET PROFILE
// ----------------------
export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req);
    // const user = await getUserProfile_test(req);
    const { accessToken } = generateTokens(user);

    // console.log("Access Token:", accessToken);

    res.json({ status: "success", data: user, accessToken });
  } catch (err) {
    res.status(401).json({ status: "error", message: err.message });
  }
};


// getUserById
export const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(404).json({ status: "error", message: err.message });
  }
};

// ----------------------
// UPDATE PROFILE
// ----------------------
export const updateProfile = async (req, res) => {
  try {
    validate(req);
    const user = await userService.updateUser(req.userId, req.body);
    res.json({ status: "success", data: user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// ----------------------
// CHANGE PASSWORD
// ----------------------
export const changePassword = async (req, res) => {
  try {
    validate(req);
    const { oldPassword, newPassword } = req.body;
    const result = await userService.changePassword(req.userId, oldPassword, newPassword);
    res.json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};


// ----------------------
// GET ALL USERS (admin)
// ----------------------
export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ status: "success", data: users });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// export const getCurrentUser = async (req, res) => {
//   try {
//     // console.log("User id" ,req.User.id);
//     // console.log("User userId" ,req.User.userId);
//     console.log(req.user.id);

//     // const user = await userService.getUserProfile();

//     // const { accessToken } = generateTokens(user);


//     // res.json({ status: "success", data: user, token: accessToken });
//     res.json({ status: "success", req });
//   } catch (err) {
//     res.status(401).json({ status: "error", message: err.message });
//   }
// };

// ----------------------
// DELETE USER (soft delete)
// ----------------------

export const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    res.json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
