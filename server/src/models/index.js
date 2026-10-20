import { sequelize } from "../config/database.config.js";

import { User } from "./users.model.js";
import { Post } from "./posts.model.js";
import { Category } from "./category.model.js";
import { Tag } from "./tag.model.js";
import { Comment } from "./comment.model.js";

// =======================
// Associations
// =======================

// Post → User (author)
User.hasMany(Post, { foreignKey: "authorId", as: "posts" });
Post.belongsTo(User, { foreignKey: "authorId", as: "author" });

// Post ↔ Category (many-to-many)
Post.belongsToMany(Category, { through: "PostCategories", as: "categories" });
Category.belongsToMany(Post, { through: "PostCategories", as: "posts" });

// Post ↔ Tag (many-to-many)
Post.belongsToMany(Tag, { through: "PostTags", as: "tags" });
Tag.belongsToMany(Post, { through: "PostTags", as: "posts" });

// Post → Comment (one-to-many)
Post.hasMany(Comment, { foreignKey: "postId", as: "comments" });
Comment.belongsTo(Post, { foreignKey: "postId", as: "post" });

// Comment → User (who wrote it)
User.hasMany(Comment, { foreignKey: "userId", as: "comments" });
Comment.belongsTo(User, { foreignKey: "userId", as: "author" });



// Post to User (Likers)
Post.belongsToMany(User, {
  through: "Likes",     // The name of the join table Sequelize will create
  as: "Likers",         // 👈 This alias generates the post.addLiker() method
  foreignKey: "postId", // The foreign key in the 'Likes' table referring to the Post's ID
});

// User to Post (LikedPosts)
User.belongsToMany(Post, {
  through: "Likes",     // Use the *same* join table name
  as: "LikedPosts",     // This alias generates the user.getLikedPosts(), user.addLikedPost() etc.
  foreignKey: "userId", // The foreign key in the 'Likes' table referring to the User's ID
});

export {
  sequelize,
  User,
  Post,
  Category,
  Tag,
  Comment,
};
