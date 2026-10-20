import express from "express";
import * as postRoute from "../controllers/post.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/", postRoute.getPosts);
router.get("/:slug", postRoute.getPostBySlug);

router.post("/", authenticate, postRoute.createPost);
router.put("/:id", authenticate, postRoute.updatePost);
router.delete("/:id", authenticate, postRoute.deletePost);

router.post("/:id/like", authenticate, postRoute.likePost);


export default router;