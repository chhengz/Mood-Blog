import { faker } from "@faker-js/faker";
import { sequelize, User, Post, Category, Tag, Comment } from "./models/index.js";

// Sync database
async function seed() {
  try {
    await sequelize.sync({ force: true }); // ⚠️ Drops tables & recreates
    console.log("Database synced!");

    // Create Users
    const users = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        User.create({
          email: faker.internet.email(),
          username: faker.internet.username(),
          password: "password123", // will be hashed
          roles: faker.helpers.arrayElement(["user", "admin"]),
        })
      )
    );

    // Create Categories
    const categories = await Promise.all(
      ["JavaScript", "Frontend", "Backend", "DevOps", "React"].map((name) =>
        Category.create({
          name,
          slug: name.toLowerCase(),
        })
      )
    );

    // Create Tags
    const tags = await Promise.all(
      ["react", "nodejs", "security", "performance"].map((name) =>
        Tag.create({ name })
      )
    );

    // Create Posts
    const posts = await Promise.all(
      Array.from({ length: 10 }).map(() =>
        Post.create({
          title: faker.lorem.sentence(),
          slug: faker.helpers.slugify(faker.lorem.slug()),
          content: faker.lorem.paragraphs(3),
          excerpt: faker.lorem.sentences(2),
          coverImage: faker.image.urlLoremFlickr({ category: "technology" }),
          readingTime: `${faker.number.int({ min: 3, max: 10 })} min`,
          views: faker.number.int({ min: 100, max: 5000 }),
          likes: faker.number.int({ min: 0, max: 200 }),
          authorId: faker.helpers.arrayElement(users).id,
        })
      )
    );

    // Attach Categories & Tags to Posts
    for (const post of posts) {
      await post.addCategories(faker.helpers.arrayElements(categories, 2));
      await post.addTags(faker.helpers.arrayElements(tags, 2));
    }

    // Create Comments
    for (const post of posts) {
      await Promise.all(
        Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() =>
          Comment.create({
            content: faker.lorem.sentences(2),
            postId: post.id,
            userId: faker.helpers.arrayElement(users).id,
          })
        )
      );
    }

    console.log("✅ Seeding completed!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

seed();
