import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { AiFillHome } from "react-icons/ai";

const Sidebar = () => {
  const username = sessionStorage.getItem("username");
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="sidebar-links">
        <Link className="link-sidebar" to="/home">
          <AiFillHome />
          Home
        </Link>
      </div>
      <div className="username-container">
        <Link to={`/${username}`} className="username-info">
          <img
            className="user-image"
            src="https://nailsbyjudy.gelmoment.com/static/default_theme/img/icons/icon-no-profile-pic.png"
            alt="User Profile"
          />
          <p className="username-info-link" id="username">@{username}</p>
        </Link>
        <button className="sign-out" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;