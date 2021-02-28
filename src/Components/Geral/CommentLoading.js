import React from 'react'
import Skeleton from "react-loading-skeleton"

function CommentLoading() {
  return (
    <>
    <Skeleton circle={true} height={70} width={70} />
      <Skeleton count={5} />
      </>
  )
}

export default CommentLoading
