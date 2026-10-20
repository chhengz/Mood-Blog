import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, Heart, House } from "lucide-react";
import { AppContext } from "../../components/contexts/AppContext";
import useApi from "../../components/hooks/useApi";
import useSEO from "../../components/hooks/useSEO";
import Loading from "../../components/ui/loading/Loading";


const ViewPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { token, user } = useContext(AppContext);
  const { get, post, loading, error } = useApi();
  const [postData, setPostData] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await get(`/posts/${slug}`);
        if (res?.data?.Likers?.some((liker) => liker.id === user?.id)) {
          setLiked(true);
        } else {
          setLiked(false);
        }
        
        setPostData(res?.data || null); // API response shape: { status, data }
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };
    fetchPost();
  }, [slug]);

  // ✅ SEO
  useSEO({
    title: postData ? `${postData.title}` : "Loading...",
    description: postData?.excerpt,
    keywords: postData?.tags?.map((t) => t.name).join(", "),
    image: postData?.coverImage,
  });


  const handleLike = async (postId) => {
    try {
      if (liked) return; 
      const res = await post(`/posts/${postId}/like`, {}, token);

      if (res.status == "success") {
        // Update the state with the actual, accurate post object from the server
        setPostData(res?.data); 
      }

      // const updatedPost = response.data.data; // Assuming your controller returns { status: "success", data: post }

      setLiked(true);
    } catch (err) {
      throw new Error(err.message || "Error liking the post.");
    }
  };

  if (loading)
    return (
      <div className="text-gray-300">
        <Loading fullScreen spinner />
      </div>
    );
  if (error) return <div className="text-red-500">Error loading post.</div>;
  if (!postData) return <div className="text-gray-400">Post not found.</div>;

  return (
    <main className=" mx-auto mt-6 md:mt-10">
      <div className="my-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className={`px-2 py-2 border border-gray-600 backdrop-blur-lg rounded-full cursor-pointer hover:scale-105 transition-transform duration-200 ease-in-out`}
        >
          <div className="text-sm font-bold flex items-center">
            <ArrowLeft className="w-5 h-5 ml-1" /> <p className="mx-2">Back</p>
          </div>
        </button>

        {user && (
          <div>
            <div>
              <button
                className="cursor-pointer"
                onClick={() => handleLike(postData.id)}
                disabled={liked}
              >
                {!liked ? <Heart /> : <>❤️</>}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cover Image */}
      {
        <div className="relative h-48 sm:h-56 md:h-68 mb-6 shadow-lg rounded-xl overflow-hidden">
          <img
            src={postData.coverImage}
            alt={postData.title}
            className="absolute w-full  object-cover "
          />
          <div className="absolute w-full bottom-0 left-0 bg-linear-to-t from-black/60  to-transparent p-4 backdrop-blur-sm rounded">
            <h1 className="text-2xl md:text-3xl text-white/80 font-bold ">
              {postData.title}
            </h1>
          </div>
        </div>
      }

      {/* Metadata */}
      <div className="text-sm text-gray-400 mb-6 flex flex-wrap gap-4">
        <span>👤 {postData.author?.username}</span>
        <span>📅 {new Date(postData.createdAt).toLocaleDateString()}</span>
        <span>⏱ {postData.readingTime}</span>
        <span>👁 {postData.views} views</span>
        <span>❤️ {postData.likes} likes</span>
      </div>

      {/* Categories */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {postData.categories?.map((cat) => (
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
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />

      {/* Tags */}
      <div className="mb-6 flex gap-2 flex-wrap">
        {postData.tags?.map((tag) => (
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
          {postData.comments?.length || 0} Comments
        </h2>
        <div className="space-y-4">
          {postData.comments?.map((comment) => (
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
