import express from "express";
import { body, param } from "express-validator";
import * as userController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";

const router = express.Router();



router.get("/profile", userController.getProfile);
router.put("/profile", authenticate, [body("username").optional().isLength({ min: 3 }), body("email").optional().isEmail(),], userController.updateProfile );

router.get( "/", authenticate, authorize(["admin"]), userController.getAllUsers );
router.get( "/:id", authenticate, param("id").isInt().withMessage("User ID must be an integer"), userController.getUserById);
router.delete( "/:id", authenticate, authorize(["admin"]), param("id").isInt().withMessage("User ID must be an integer"), userController.deleteUser );
router.put( "/change-password", authenticate, [ body("oldPassword").exists().withMessage("Old password is required"), body("newPassword").isLength({ min: 8 }).withMessage("New password must be at least 8 characters"), ], userController.changePassword );


export default router;