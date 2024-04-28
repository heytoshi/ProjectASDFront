import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/LoginPage";
import Home from "./pages/Home/HomePage"
import Register from "./pages/Register/RegisterPage";
import React from "react";
import Protected from "./components/Protected/Protected";
import NonProtected from "./components/NonProtected/NonProtected";
import Profile from "./pages/Profile/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<NonProtected />}>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Route>
        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
          <Route path="/:username" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;