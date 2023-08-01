import { React, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";
import { Navigate, useLocation } from "react-router-dom";

/**
 * shamelessly stolen from https://www.robinwieruch.de/react-router-authentication/
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserProfileContext);
  const location = useLocation();
  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
