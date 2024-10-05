import React from 'react'
import { Link } from 'react-router-dom'
import author1 from '../image/author1.jpg'
function PostAuthor() {
  return (
    <Link  className='post_author' to={`showother`}>
      <div className='post_author-avatar'>
         <img src={author1} alt=''/>
      </div>
      <div className='post_author-details'>
         <h6>By: Ernest Achiver</h6>
         <small>Just Now</small>
      </div>
    </Link>
  )
}

export default PostAuthor