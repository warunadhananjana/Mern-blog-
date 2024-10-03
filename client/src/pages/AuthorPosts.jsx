import React, { useState } from 'react'
import { DUMMY_POSTS } from '../data'
import PostItem from '../components/PostItem'
function AuthorPosts() {
   const [posts, setPosts] = useState(DUMMY_POSTS)
   
  return (
   
    <section className='author__posts'>
     {posts.length> 0 ?<div className='container author_posts-container'>
         {posts.map(({ id, thumbnail, category, desc, authorID, title }) => (
        <PostItem
          key={id}
          postId={id} 
          thumbnail={thumbnail}
          category={category}
          desc={desc}
          authorID={authorID}
          title={title}
        />
      ))}
     </div>
      :<h2 className='center'>No post founds</h2>}
    </section>
  )
}

export default AuthorPosts