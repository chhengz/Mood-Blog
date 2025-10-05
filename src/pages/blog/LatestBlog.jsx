// LatestBlog.jsx

import React, { useEffect, useState } from 'react';
import useApi from '../../components/hooks/useApi';
import PostCard from '../../components/ui/card/PostCard';

const LatestBlog = () => {

 const { get, loading, error } = useApi();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
    try {
      const data = await get("/posts");
      setPosts(data?.data?.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  fetchPosts();
  }, []);


  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );


  const latestFivePosts = sortedPosts.slice(0, 3);

  return (
    <main className="max-w-4xl mx-auto py-6 md:py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Latest Blog Posts</h1>

      <PostCard loading={loading} posts={latestFivePosts} error={error} />
    </main>
  );
};

export default LatestBlog;