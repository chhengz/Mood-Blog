import express from "express";
import { body } from "express-validator";
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/login", [body("email").isEmail().withMessage("Invalid email"), body("password").exists().withMessage("Password is required"),], authController.login);
router.post("/register", [body("email").isEmail().withMessage("Invalid email"), body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters"),], authController.register);

router.post("/refresh-token", authController.refreshToken);
router.post("/request-reset", [body("email").isEmail().withMessage("Invalid email")], authController.requestPasswordReset);
router.post("/reset-password", [body("token").exists().withMessage("Reset token is required"), body("newPassword").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),], authController.resetPassword);


export default router;