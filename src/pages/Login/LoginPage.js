import React from "react";
import LoginComponent from "../../components/Login/LoginComponent";
import './LoginPage.css';

const LoginPage = () => {
  console.log(process.env.REACT_APP_BACKEND)
  return (
    <div className="login-page">
      <LoginComponent />
    </div>
  );
};

export default LoginPage;