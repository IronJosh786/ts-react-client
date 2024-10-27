import { useEffect } from "react";
import { UseAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isLoggedIn, loading, fetchAuthStatus } = UseAuth();

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to={"/signin"} replace />;
};

export default PrivateRoute;
