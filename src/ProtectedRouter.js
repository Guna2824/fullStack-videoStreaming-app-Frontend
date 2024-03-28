import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const authed = localStorage.getItem("auth") !== null;

  return authed ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
