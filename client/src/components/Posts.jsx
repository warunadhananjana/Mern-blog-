import React, { useState } from 'react';
import PostItem from './PostItem';
import { DUMMY_POSTS } from '../data';


const Post = () => {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <section className='posts'>
     {posts.length> 0 ?<div className='container posts_container'>
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
  );
};

export default Post;
