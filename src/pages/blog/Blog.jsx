import React, { useEffect, useState } from "react";
import useApi from "../../components/hooks/useApi";
import PostCard from "../../components/ui/card/PostCard";

const Blog = () => {

  const { get, loading, error } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
    try {
      const data = await get("/posts");
      // console.log("Fetched posts:", data?.data?.posts);
      setPosts(data?.data?.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
  }, []);

  return (
    <main className="max-w-4xl mx-auto mt-6 md:mt-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 ">Blog Posts</h1>

      <PostCard loading={loading} posts={posts} error={error} />
    </main>
  );
};

export default Blog;
