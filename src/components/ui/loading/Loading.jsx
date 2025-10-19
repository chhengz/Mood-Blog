import React from 'react'
import { Loader, LoaderCircle } from 'lucide-react'

{/* <LoaderCircle /> */}
const Loading = ({spinner = false, fullScreen = false}) => {
  return (
    <div className={`${fullScreen ? 'fixed inset-0 flex items-center justify-center ' : ''}`}>
      {
        spinner ? (
          
          <LoaderCircle className="h-8 w-8 text-blue-500 animate-spin" />
        ) : (
          <div className="text-gray-400">Loading...</div>
        )
      }
    </div>
  )
}

export default Loading