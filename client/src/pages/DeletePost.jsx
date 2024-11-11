import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

function DeletePost() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div style={{ marginTop: "35px" }}>
      <Link to={"/posts/wereer/delete"} className="btn sm danger">
        <span>Delete</span>
      </Link>
    </div>
  );
}

export default DeletePost;
