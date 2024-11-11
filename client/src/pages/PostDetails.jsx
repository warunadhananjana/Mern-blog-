import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useParams } from "react-router-dom";
import thumbnail from "../image/blog1.jpg";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    getPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="post-details">
      {error && <p className="error">{error.message}</p>}
      {post && (
        <div className="container post-detail_container">
          <div className="post-detail_header">
            {/* <PostAuthor authorID={post.creator} createAt={post.createAt} /> */}
            {currentUser?.id === post?.creator && (
              <div
                style={{ marginTop: "35px" }}
                className="post-details_buttons"
              >
                <Link
                  to={`/posts/${post?._id}/edit`}
                  className="btn sm primary"
                >
                  <span>Edit</span>
                </Link>
                <DeletePost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail_thumbnail">
            <img
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
              alt="Post Thumbnail"
              onError={(e) => (e.target.src = thumbnail)} // Fallback if image fails
            />
          </div>
          <div style={{ marginTop: "50px" }} className="para">
            <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetails;
