import React from 'react'
import { Link } from 'react-router';

const PostCard2 = ({ loading, posts, error }) => {


    if (error) {
      return <p className="text-red-500">Error: {error}</p>;
    }

  return (
    <ul className="flex flex-col gap-4 md:gap-2">

        {
          loading && <p className="text-gray-400">Loading posts...</p>
        }
        {
          posts.length === 0 ? (
            <p className="text-gray-400">No posts available.</p>

        ) : (

          posts.map((blog) => (
          <Link to={`/blog/${blog.slug}`} key={blog.id}>
            <li
            
            className="group mb-6 md:mb-4 p-4 rounded-xl shadow-lg hover:shadow-emerald-800 border border-[var(--border-color)] transistion-all duration-200 ease-in-out cursor-pointer"
          >
            <h2 className=" text-md font-medium md:text-xl md:font-bold text-gray-300 group-hover:text-gray-200">
              {blog.title}
              {/* <Link to={`/blog/${post.slug}`}>{post.title}</Link> */}
            </h2>
            <p className="text-sm text-[var(--text-gray)] group-hover:text-gray-400">
              {blog.excerpt}
            </p>

            <div className="full flex justify-between items-center mt-2">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-400 border border-gray-200 rounded-full overflow-hidden flex justify-center items-center mr-2">
                  <p className="font-bold">{blog?.author?.username?.[0]?.toUpperCase() || "?"}</p>
                </div>
                <span className="mt-1 text-xs text-[var(--text-gray)] group-hover:text-gray-400">
                  {blog?.author?.username || "Unknown"} •{" "}
                  {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                </span>
              </div>
              <div>
                <span className="mt-1 text-xs text-[var(--text-gray)] group-hover:text-gray-400">
                    {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                  </span>
              </div>
            </div>
          </li>
          </Link>
        ))
        )
      
      }
      </ul>
  )
}

export default PostCard2