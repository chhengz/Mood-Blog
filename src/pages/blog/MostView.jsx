import React from 'react'
import { blogData } from '../../data/blog'

const MostView = () => {
  return (
    <main className="max-w-4xl mx-auto py-8">
          <ul className="flex flex-col gap-4 md:gap-2">

           
            {blogData.data.posts.map((blog) => (
              <li
                key={blog.id}
                className="group mb-6 md:mb-4 p-4 rounded-xl shadow-lg hover:shadow-emerald-800 border border-[var(--border-color)] transistion-all duration-200 ease-in-out cursor-pointer"
              >
                <h2 className=" text-md font-medium md:text-xl md:font-bold text-gray-300 group-hover:text-gray-200">
                  {blog.title}
                </h2>
                <p className="text-sm text-[var(--text-gray)] group-hover:text-gray-400">
                  {blog.excerpt}
                </p>
    
                <div className="full flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-400 border border-gray-200 rounded-full overflow-hidden flex justify-center items-center mr-2">
                      <p>{blog.author.name[0].toUpperCase()}</p>
                    </div>
                    <span className="text-xs text-[var(--text-gray)] group-hover:text-gray-400">
                      By {blog.author.name} |{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-[var(--text-gray)] group-hover:text-gray-400">
                      {blog.readingTime} min read
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </main>
  )
}

export default MostView