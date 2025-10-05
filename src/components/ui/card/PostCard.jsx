import React from 'react'
import { Link } from 'react-router';

const PostCard = ({ loading, posts, error }) => {


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
            
            className="group flex items-start justify-between mb-4"
          >
            <h2 className=" text-md  md:text-lg  text-[var(--text-gray)] group-hover:text-gray-400">
              {blog.title}
              {/* <Link to={`/blog/${post.slug}`}>{post.title}</Link> */}
            </h2>
            <span className="mt-1 text-md text-[var(--text-gray)] group-hover:text-gray-400 group-hover:underline">
                    {blog?.createdAt ? new Date(blog.createdAt).toLocaleDateString() : ""}
                  </span>
            

            
          </li>
          </Link>
        ))
        )
      
      }
      </ul>
  )
}

export default PostCard