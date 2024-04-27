import React, { useRef, useState } from "react";
import "./RegisterComponent.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = phoneNumberRef.current.value;

    const registerData = { username, password, firstName, lastName, email, phoneNumber };

    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND + "/project/api/v1/service/public/register",
        registerData
      );
      if (response.data)  {
        navigate("/");
      }
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.errorMessage);
    }
  };

  return (
    <div className="auth-container-register">
      <h2>Sign up</h2>
      <form id="signup-form" onSubmit={handleSubmit}>
      <input
          ref={firstNameRef}
          id="firstName"
          className="input-auth"
          type="text"
          name="firstName"
          placeholder="First Name"
          required
        />
        <input
          ref={lastNameRef}
          id="lastName"
          className="input-auth"
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
        />
        <input
          ref={emailRef}
          id="email"
          className="input-auth"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          ref={usernameRef}
          id="username"
          className="input-auth"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <input
          ref={passwordRef}
          id="password"
          className="input-auth"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          ref={phoneNumberRef}
          id="phoneNumber"
          className="input-auth"
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          required
        />
        <input className="submit-button" type="submit" value="Sign up" />
      </form>
      {errorMessage && (
        <div id="error-message" className="error-message">
          {errorMessage}
        </div>
      )}
      <p>
        Already have an account?
        <Link to="/" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterComponent;
