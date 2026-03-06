import React from "react";
import Header from "../components/user/header";
import { Link } from "react-router-dom";
import { FaCommentDots } from "react-icons/fa";

const UserLayout = ({ children, isLoggedIn, username, onLogout }) => {
  const token = localStorage.getItem("accessToken");

  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={onLogout} />
      <div style={{ paddingTop: "90px" }}>{children}</div>
      <Link
        to="/chat"
        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "60px",
          height: "60px",
          zIndex: 1000,
          fontSize: "24px",
          border: "2px solid #fff",
          backgroundColor: "#014AB0"
        }}
        title="Chat Live"
      >
        <FaCommentDots />
      </Link>
    </>
  );
};

export default UserLayout;