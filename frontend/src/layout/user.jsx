import React from "react";
import Header from "../components/user/header";

const UserLayout = ({ children, isLoggedIn, username, onLogout }) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={onLogout} />
      <div style={{ paddingTop: "90px" }}>{children}</div>
    </>
  );
};

export default UserLayout;