import { validationResult } from "express-validator";
import * as authService from "../services/auth.service.js";
import * as userService from "../services/user.service.js";


// Constants
const _MAXAGE = 7 * 24 * 60 * 60 * 1000; // 7 days

const validate = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    throw new Error(
      errors
        .array()
        .map((e) => e.msg)
        .join(", ")
    );
};

// ----------------------
// REGISTER
// ----------------------
export const register = async (req, res) => {
  try {
    validate(req);
    const user = await userService.createUser(req.body);
    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// POST /login
export const login = async (req, res) => {
  try {
    validate(req);
    const result = await authService.loginUser(req.body);

    // Send refresh token in HttpOnly cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: _MAXAGE,
    });

    // Return only user data and access token (not refresh token)
    res.json({
      status: "success",
      data: {
        user: result.user,
        accessToken: result.accessToken,
      },
    });
  } catch (err) {
    res.status(401).json({ status: "error", message: err.message });
  }
};



// POST /refresh-token
export const refreshToken = async (req, res) => {
  try {
  //   // validate(req);

    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ status: "error", message: "No refresh token cookie provided" });
    }

    // Validate the refresh token and get new tokens from service
    const tokens = await authService.refreshTokens(refreshToken);

    // Set new refresh token in HttpOnly cookie
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/", // I will change to /auth/refresh-token if issues arise
      maxAge: _MAXAGE,
    });

    // Return only the access token (refresh token is in cookie)
    res.json({ 
      status: "success", 
      data: { 
        accessToken: tokens.accessToken 
      } 
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "Unauthorized: Invalid refresh token",
    });
  }
};

// POST /request-reset
export const requestPasswordReset = async (req, res) => {
  try {
    validate(req);
    const { email } = req.body;
    const result = await authService.requestPasswordReset(email);
    res.json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

// POST /reset-password
export const resetPassword = async (req, res) => {
  try {
    validate(req);
    const { token, newPassword } = req.body;
    const result = await authService.resetPassword(token, newPassword);
    res.json({ status: "success", data: result });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};
