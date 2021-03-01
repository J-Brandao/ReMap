import React from 'react'
import ContentLoader from "react-content-loader"

function CommentLoading() {
  return (
    <>
     <ContentLoader 
    speed={2}
    width={400}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#c4c4c4"
    foregroundColor="#FFFFFF"
    
  >
    <rect x="48" y="8" rx="3" ry="3" width="500" height="6" /> 
        <rect x="48" y="26" rx="3" ry="3" width="150" height="6" /> 
        <circle cx="20" cy="20" r="20" />
        </ContentLoader>
      </>
  )
}

export default CommentLoading
