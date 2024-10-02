import React from 'react';
import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';

function PostItem({ postId, thumbnail, category, desc, authorID, title }) {
  return (
    <article className='post'>
      <div className='post_thumbnail'>
        <img src={thumbnail} alt={title}/>
      </div>
      <div className='post_content'>
        <Link to={`/post/${postId}`}>
          <h3>{title}</h3>
        </Link>
        <p>{desc}</p>
        <div className='post__footer'>
          <PostAuthor authorID={authorID}/>
          <Link className='btn primary' to={`/posts/categories/${category}`}>{category}</Link>
        </div>
        <Link to={`/author/${authorID}`}>
        <div className="post_author-details">
          
        </div>
      </Link>
      </div>
    </article>
  );
}

export default PostItem;