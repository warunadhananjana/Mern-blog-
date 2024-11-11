import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authorPlaceholder from "../image/author1.jpg"; // Fallback image
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, [authorID]);

  return (
    <Link className="post_author" to="showother">
      <div className="post_author-avatar">
        <img
          src={
            author?.avatar
              ? `${process.env.REACT_APP_BASE_URL}/uploads/${author.avatar}`
              : authorPlaceholder
          }
          alt={author?.name || "Author avatar"}
        />
      </div>
      <div className="post_author-details">
        <h6>By: {author?.name || "Unknown Author"}</h6>
        <small>
          <ReactTimeAgo date={new Date(createAt)} locale="en-US" />
        </small>
      </div>
    </Link>
  );
};

export default PostAuthor;
