import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useApi from "../../components/hooks/useApi";
import useSEO from "../../components/hooks/useSEO";
import { ArrowLeft, House } from "lucide-react";

const ViewPost = () => {
    const navigate = useNavigate();
  const { slug } = useParams();
  const { get, loading, error } = useApi();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await get(`/posts/${slug}`);
        setPost(data?.data || null); // API response shape: { status, data }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [slug]);

  // ✅ SEO
  useSEO({
    title: post ? `${post.title}` : "Loading...",
    description: post?.excerpt,
    keywords: post?.tags?.map((t) => t.name).join(", "),
    image: post?.coverImage,
  });

  if (loading) return <p className="text-gray-300">Loading...</p>;
  if (error) return <p className="text-red-500">Error loading post.</p>;
  if (!post) return <p className="text-gray-400">Post not found.</p>;

  return (
    <main className=" mx-auto mt-6 md:mt-10">

        <div className="my-6">
            <button
            onClick={() => navigate(-1)}
            className={`px-2 py-2 border border-gray-600 backdrop-blur-lg rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
          >
            <div className="text-sm font-bold flex items-center">
              <ArrowLeft className="w-5 h-5 ml-1" /> <p className="mx-2">Back</p>
            </div>
          </button>
        </div>


      {/* Cover Image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-48 sm:h-56 md:h-68 object-cover border border-zinc-600/50 shadow-lg rounded-xl mb-6"
        />
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
        {post.title}
      </h1>

      {/* Metadata */}
      <div className="text-sm text-gray-400 mb-6 flex flex-wrap gap-4">
        <span>👤 {post.author?.username}</span>
        <span>📅 {new Date(post.createdAt).toLocaleDateString()}</span>
        <span>⏱ {post.readingTime}</span>
        <span>👁 {post.views} views</span>
        <span>❤️ {post.likes} likes</span>
      </div>

      {/* Categories */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {post.categories?.map((cat) => (
          <span
            key={cat.id}
            className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-md"
          >
            #{cat.name}
          </span>
        ))}
      </div>

      {/* Content */}
      <article
        className="prose prose-invert lg:prose-lg max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {post.tags?.map((tag) => (
          <span
            key={tag.id}
            className="bg-green-600/20 text-green-400 text-xs px-2 py-1 rounded-md"
          >
            #{tag.name}
          </span>
        ))}
      </div>

      {/* Comments */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">
          {post.comments?.length || 0} Comments
        </h2>
        <div className="space-y-4">
          {post.comments?.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-800 p-3 rounded-lg border border-gray-700"
            >
              <p className="text-gray-300">{comment.content}</p>
              <span className="text-xs text-gray-500">
                — {comment.author?.username},{" "}
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default ViewPost;
