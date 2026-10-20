import { Op } from "sequelize";
import { Post, User, Category, Tag, Comment } from "../models/index.js";


// 📌 Get paginated + filtered posts
export const getPosts = async ({ page = 1, perPage = 10, categorySlug, tagName, authorName }) => {
  const where = {};

  // Build include options
  const include = [
    {
      model: User,
      as: "author",
      attributes: ["id", "username"], // "email"
      ...(authorName && { where: { username: { [Op.iLike]: `%${authorName}%` } } }),
    },
    {
      model: Category,
      as: "categories",
      through: { attributes: [] },
      ...(categorySlug && { where: { slug: categorySlug } }),
    },
    {
      model: Tag,
      as: "tags",
      through: { attributes: [] },
      ...(tagName && { where: { name: tagName } }),
    },
    {
      model: Comment,
      as: "comments",
      attributes: ["id"],
    },
    
  ];

  // Count for pagination
  const totalItems = await Post.count({ include, distinct: true });

  // Query paginated posts
  const posts = await Post.findAll({
    where,
    include,
    limit: perPage,
    offset: (page - 1) * perPage,
    order: [["createdAt", "DESC"]],
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "excerpt",
      "coverImage",
      "createdAt",
      "updatedAt",
      "readingTime",
      "views",
      "likes",
    ],
  });

  return {
    posts: posts.map((p) => ({
      ...p.toJSON(),
      commentsCount: p.comments.length,
    })),
    pagination: {
      page,
      perPage,
      totalPages: Math.ceil(totalItems / perPage),
      totalItems,
    },
  };
};

// export const getPostBySlug = async (slug) => {
//   return await Post.findOne({
//     where: { slug },
//     include: [
//       { model: User, as: "author", attributes: ["id", "username", "email"] },
//       { model: Category, as: "categories", through: { attributes: [] } },
//       { model: Tag, as: "tags", through: { attributes: [] } },
//       {
//         model: Comment,
//         as: "comments",
//         include: [{ model: User, as: "author", attributes: ["id", "username"] }],
//       },
//     ],
//   });
// };

// 📌 Get single post by slug
export const getPostBySlug = async (slug) => {
  
  
  // count views
  const post = await Post.findOne({ where: { slug } });

  if (post) {
    post.views += 1;
    await post.save();
  }
  
  
  return await Post.findOne({
    where: { slug },
    include: [
      { model: User, as: "author", attributes: ["id", "username", "email"] },
      { model: Category, as: "categories", through: { attributes: [] } },
      { model: Tag, as: "tags", through: { attributes: [] } },
      {
        model: Comment,
        as: "comments",
        include: [{ model: User, as: "author", attributes: ["id", "username"] }],
      },
      {
        model: User,
        as: "Likers", 
        attributes: ["id", "username"], // Only include necessary user fields
        through: { attributes: [] },    // Exclude join table columns (postId, userId)
      },
    ],
  });
};

// 📌 Fixed Like a post services
export const likePost = async (postId, userId) => {
  const post = await Post.findByPk(postId, {
    include: [
      { model: User, as: "author", attributes: ["id", "username", "email"] },
      { model: Category, as: "categories", through: { attributes: [] } },
      { model: Tag, as: "tags", through: { attributes: [] } },
      {
        model: Comment,
        as: "comments",
        include: [{ model: User, as: "author", attributes: ["id", "username"] }],
      },
      {
        model: User,
        as: "Likers", 
        attributes: ["id", "username"], 
        through: { attributes: [] },
      },
    ]
  });
  if (!post) throw new Error("Post not found");
  if (!userId) throw new Error("User ID is required to like a post");

  const isAlreadyLiked = await post.hasLiker(userId);

  if (isAlreadyLiked) {

    return post; 

  }

  await post.addLiker(userId);

  post.likes += 1;
  await post.save();

  return post;
};

// 📌 Create post
export const createPost = async (postData) => {
  const { categories = [], tags = [], ...postFields } = postData;

  const post = await Post.create(postFields);

  if (categories.length) {
    await post.addCategories(categories);
  }
  if (tags.length) {
    await post.addTags(tags);
  }

  return post;
};

// 📌 Update post
export const updatePost = async (id, postData) => {
  const { categories, tags, ...postFields } = postData;
  const post = await Post.findByPk(id);
  if (!post) return null;

  await post.update(postFields);

  if (categories) {
    await post.setCategories(categories); // replace existing
  }
  if (tags) {
    await post.setTags(tags);
  }

  return post;
};

// 📌 Delete post
export const deletePost = async (id) => {
  const post = await Post.findByPk(id);
  if (!post) return null;
  await post.destroy();
  return post;
};