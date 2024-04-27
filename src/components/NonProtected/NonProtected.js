import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        return true;
    }
};


const NonProtected = () => {
    const token = sessionStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
        return <Navigate to={"/home"} replace />;
    }
    return <Outlet />;
};

export default NonProtected;