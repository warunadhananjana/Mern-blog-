import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar1 from '../image/author1.jpg';
import Avatar2 from '../image/author2.jpg';
import Avatar3 from '../image/author3.jpg';
import Avatar4 from '../image/author4.jpg';


const authorsData = [
  { id: 1, avatar: Avatar2, name: 'Ernest Achiver', post: 2 },
  { id: 2, avatar: Avatar1, name: 'Jone Doe senanayaka', post: 3 },
  { id: 3, avatar: Avatar3, name: 'Dramani Mahama', post: 1 },
  { id: 4, avatar: Avatar4, name: 'Nana Addo', post: 4 },
];

const Authors = () => {
  const [authors, setAuthors] = useState(authorsData);

  return (
    <div>
      <section className='authors'>
        {authors.length > 0 ? (
          <div className='container1 authors_container'>
            {authors.map(({ id, avatar, name, post }) => (
              <Link key={id} to={`/posts/users/${id}` } className='author'>
                <div className='author_avatar'>
                  <img src={avatar} alt={`Image of ${name}`} />
                </div>
                <div className='author_info'>
                  <h4>{name}</h4>
                  <p>{post} posts</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <h2>No users/authors found.</h2>
        )}
      </section>
    </div>
  );
};

export default Authors;
