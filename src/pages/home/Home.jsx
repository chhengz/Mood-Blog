import React from 'react'

import LatestBlog from '../blog/LatestBlog'

const Home = () => {
  return (
    <div>
      

      <div className='border-b border-gray-600 mb-6 md:mb-8'>
        <LatestBlog />
      </div>
    </div>
  )
}

export default Home