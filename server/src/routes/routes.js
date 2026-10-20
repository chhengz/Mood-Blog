import express from 'express';
import dotenv from 'dotenv';
import authRoutes from "./auth.routes.js";
import userRoutes from './user.routes.js';
import postRoutes from './post.routes.js';

dotenv.config();
const router = express.Router();
const baseURL = process.env.BASE_URL || "api/v1";


router.use(`/${baseURL}/auth`, authRoutes);              // Auth routes
router.use(`/${baseURL}/users`, userRoutes);             // User routes
router.use(`/${baseURL}/posts`, postRoutes);             // Post routes


// console.log(`Routes mounted at /${baseURL}`);


export default router;