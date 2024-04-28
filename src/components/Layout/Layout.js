import React from "react";
import "./Layout.css";
import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">{children}</div>
      <div className="right-bar"></div>
    </div>
  );
};

export default Layout;