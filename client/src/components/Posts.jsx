import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
// import { DUMMY_POSTS } from '../data';
import Loader from "../components/Loader";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchPosts();
  });

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts_container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              description,
              creator,
              title,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postId={id}
                thumbnail={thumbnail}
                category={category}
                desc={description}
                authorID={creator}
                title={title}
                createAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className="center">No post founds</h2>
      )}
    </section>
  );
};

export default Post;
