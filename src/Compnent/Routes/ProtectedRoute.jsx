import { useContext } from "react";
import { AuthContext } from "../Authentication/Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <h1 className="flex items-center justify-center mt-48">
        <span className="loading loading-bars loading-lg "></span>
      </h1>
    );
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        state={location?.pathname || "/"}
        replace
      ></Navigate>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
