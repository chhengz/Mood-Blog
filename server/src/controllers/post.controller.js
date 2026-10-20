import * as postService from "../services/post.service.js";

// 📌 GET /posts
export const getPosts = async (req, res) => {
  try {
    const { page, perPage, category, tag, author } = req.query;
    const data = await postService.getPosts({
      page: parseInt(page) || 1,
      perPage: parseInt(perPage) || 10,
      categorySlug: category,
      tagName: tag,
      authorName: author,
    });
    res.json({ status: "success", data });
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// 📌 GET /posts/:slug
export const getPostBySlug = async (req, res) => {
  try {
    const post = await postService.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }
    res.json({ status: "success", data: post });
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// 📌 POST /posts
export const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json({ status: "success", data: post });
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// 📌 PUT /posts/:id
export const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(req.params.id, req.body);
    if (!post) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }
    res.json({ status: "success", data: post });
  } catch (err) {
    console.error("Error updating post:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// 📌 DELETE /posts/:id
export const deletePost = async (req, res) => {
  try {
    const post = await postService.deletePost(req.params.id);
    if (!post) {
      return res.status(404).json({ status: "error", message: "Post not found" });
    }
    res.json({ status: "success", message: "Post deleted" });
  } catch (err) {
    console.error("Error deleting post:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};


// 📌 Like a post controller
export const likePost = async (req, res) => {
  try {
    const post = await postService.likePost(req.params.id, req.user?.id || null);
    res.json({ status: "success", data: post });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(500).json({ status: "error", message: "Server error" });
  }
};

// Example: /posts/like/1